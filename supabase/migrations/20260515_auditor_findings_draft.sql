-- ─────────────────────────────────────────────────────────────────────────
-- auditor_findings_draft — AI-gegenereerde concept-bevindingen per control
-- Doel: voor elke ingevulde control bouwt generate-findings-draft een
-- voorstel-bevinding. Lead Auditor reviewt in admin (accept/edit/reject)
-- en promoveert naar auditor_findings (de echte, ondertekende versie).
--
-- Diff tussen draft en final wordt apart gelogd in auditor_feedback (fase 3)
-- en gebruikt als few-shot context in volgende generate-findings-draft runs.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.auditor_findings_draft (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  control_id      text not null,
  severity        text not null check (severity in ('observation','minor','major','critical')),
  finding         text not null,
  recommendation  text not null default '',
  evidence_cited  jsonb not null default '[]'::jsonb,
  evidence_assessment text default '',
  confidence      numeric(3,2) not null default 0.5 check (confidence >= 0 and confidence <= 1),
  reasoning       text default '',
  model_version   text not null default 'claude-opus-4-5',
  status          text not null default 'pending' check (status in ('pending','accepted','edited','rejected','superseded')),
  reviewed_by     uuid references auth.users(id),
  reviewed_at     timestamptz,
  created_at      timestamptz not null default now(),
  unique (user_id, control_id)
);

create index if not exists idx_auditor_findings_draft_user on public.auditor_findings_draft(user_id);
create index if not exists idx_auditor_findings_draft_status on public.auditor_findings_draft(user_id, status);
create index if not exists idx_auditor_findings_draft_confidence on public.auditor_findings_draft(user_id, confidence);

alter table public.auditor_findings_draft enable row level security;

drop policy if exists "admin all on auditor_findings_draft" on public.auditor_findings_draft;
create policy "admin all on auditor_findings_draft"
  on public.auditor_findings_draft
  for all
  using (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role' in ('admin','auditor')
             or u.raw_app_meta_data->>'pakket' = 'admin')
    )
  )
  with check (
    exists (
      select 1 from auth.users u
      where u.id = auth.uid()
        and (u.raw_app_meta_data->>'role' in ('admin','auditor')
             or u.raw_app_meta_data->>'pakket' = 'admin')
    )
  );

-- Klant mag NIET zien wat de AI-draft was voordat Lead Auditor signoff geeft.
-- Geen klant-policy = geen klant-toegang. Bewust.

comment on table public.auditor_findings_draft is
  'AI-gegenereerde concept-bevindingen per control. Wachten op Lead Auditor review.';
comment on column public.auditor_findings_draft.confidence is
  'AI-zelfgerapporteerd confidence-niveau 0-1. UI sorteert oplopend zodat lage confidence eerst gereviewed wordt.';
comment on column public.auditor_findings_draft.evidence_cited is
  'JSON array van bestandsnamen die de AI feitelijk geraadpleegd heeft voor deze finding.';
comment on column public.auditor_findings_draft.evidence_assessment is
  'Korte AI-beoordeling van het bewijsmateriaal zelf (bv. "policy gedateerd 2023, geen ondertekening zichtbaar").';
