# Veilige Document Downloads — Setup

## Wat er is gebouwd

1. **`supabase/functions/get-document-url/index.ts`** — Edge Function die signed URLs genereert (60s geldig)
2. **`supabase-policies-setup.sql`** — Database tabel voor access log
3. **`dashboard.html`** — Aangepast: `downloadDoc()` roept nu de Edge Function aan
4. **Pakket-gebaseerde toegangscontrole** — alleen `readiness`, `beleid-basis`, `beleid-premium` en `admin` kunnen downloaden

## Hoe het werkt

```
User klikt Download in dashboard
        ↓
dashboard.html roept Edge Function aan (met auth token)
        ↓
Edge Function verifieert:
  - User is ingelogd ✓
  - User pakket heeft toegang tot dit bestand ✓
  - Bestandspad is geldig (geen path traversal) ✓
        ↓
Edge Function genereert signed URL (60s geldig)
        ↓
Browser opent signed URL → download start
        ↓
Signed URL expiret na 60s (kan niet gedeeld worden)
```

## Deployment stappen

### Stap 1: Storage bucket aanmaken

1. Ga naar: https://supabase.com/dashboard/project/tvqhxhoohzdzekcfzjuv/storage/buckets
2. Klik **"New bucket"**
3. Configuratie:
   - Naam: `policies`
   - **Public: UIT** (private bucket!)
   - File size limit: 50 MB
   - Allowed MIME types: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
4. Klik **"Create"**

### Stap 2: Access log tabel aanmaken

1. Ga naar: https://supabase.com/dashboard/project/tvqhxhoohzdzekcfzjuv/sql
2. Plak inhoud van `supabase-policies-setup.sql`
3. Klik **Run**

### Stap 3: Edge Function deployen

**Via Supabase Dashboard (aanbevolen):**
1. Dashboard → Edge Functions → "Deploy a new function"
2. Naam: `get-document-url`
3. Plak inhoud van `supabase/functions/get-document-url/index.ts`
4. Klik Deploy

**Via CLI:**
```bash
cd C:/Users/raoul/Documents/annex27
supabase functions deploy get-document-url
```

### Stap 4: Documenten uploaden

Upload de documenten in de juiste folderstructuur:

```
policies/  (bucket)
├── basispakket/
│   ├── 01-isms-scope.docx
│   ├── 02-informatiebeveiligingsbeleid.docx
│   └── ... (alle basispakket documenten)
├── premium/
│   ├── 23-leveranciersbeleid.docx
│   └── ... (premium documenten)
└── werkinstructies/
    ├── A5-organisatorisch.docx
    └── ... (werkinstructies)
```

**Via Supabase Dashboard:**
1. Ga naar Storage → policies bucket
2. Maak folders aan: `basispakket`, `premium`, `werkinstructies`
3. Upload alle `.docx` files vanuit `C:\Users\raoul\Documents\annex27\beleidspakket\`

**Via CLI (sneller bij veel bestanden):**
```bash
supabase storage cp --recursive ./beleidspakket/basispakket policies/basispakket
supabase storage cp --recursive ./beleidspakket/premium policies/premium
supabase storage cp --recursive ./beleidspakket/werkinstructies policies/werkinstructies
```

### Stap 5: User pakketten instellen

Pakketten worden opgeslagen in `user_metadata.pakket` bij de user. Opties:
- `gap` — alleen gap-analyse toegang (geen documenten)
- `readiness` — readiness platform + basispakket docs
- `beleid-basis` — basispakket docs eenmalig
- `beleid-premium` — basis + premium docs
- `admin` — alle toegang

**Een user pakket instellen (via Supabase Dashboard):**
1. Authentication → Users → selecteer user
2. "Edit user" → User Metadata
3. Voeg toe: `{"pakket": "readiness"}`
4. Save

**Of via SQL:**
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"pakket": "readiness"}'::jsonb
WHERE email = 'klant@voorbeeld.nl';
```

## Testen

1. Log in op portal.html met een testaccount
2. Zorg dat de user `pakket: readiness` heeft in metadata
3. Ga naar Dashboard → Documenten
4. Klik Download op een document
5. Check in Supabase Dashboard → Edge Functions → get-document-url → Logs
6. Check in Supabase Dashboard → Table Editor → `document_access_log` of de download is gelogd

## Security features

- ✅ Documenten niet publiek toegankelijk via URL
- ✅ Signed URLs verlopen na 60 seconden
- ✅ Path traversal beschermd (`..` en `//` geweigerd)
- ✅ Alleen `.docx`, `.pdf`, `.xlsx` toegestaan
- ✅ Auth check verplicht (401 als niet ingelogd)
- ✅ Pakket-based authorization (403 als geen toegang)
- ✅ Audit log van alle downloads
- ✅ Service role key alleen server-side

## Wat je vriend nu NIET meer kan

- Direct document downloaden via URL → faalt (private bucket)
- HTML bekijken en bestandsnamen raden → downloadt mislukt zonder signed URL
- Signed URL delen met anderen → werkt max 60 seconden, dan dood
- Bypassen via "ik ben een ander pakket" → server-side check blokkeert

## Wat overblijft als "risico"

- User met `readiness` pakket deelt downloaded document met derde → dit is contractueel/juridisch, niet technisch op te lossen
- Watermerk met user email toevoegen aan PDFs → kan later (via server-side PDF generation)
