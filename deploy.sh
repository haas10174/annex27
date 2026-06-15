#!/bin/bash
# Deploy Annex27 website to Hostnet
# Credentials worden gelezen uit ~/.annex27_ftp (NIET in git!)
# Maak dit bestand aan met: echo "FTP_USER=cz69laf6z_u:JOUW_WACHTWOORD" > ~/.annex27_ftp

if [ ! -f ~/.annex27_ftp ]; then
  echo "ERROR: ~/.annex27_ftp niet gevonden."
  echo "Maak het bestand aan: echo \"FTP_USER=cz69laf6z_u:JOUW_WACHTWOORD\" > ~/.annex27_ftp"
  exit 1
fi

source ~/.annex27_ftp

FTP_HOST="ftp://ftp.cz69laf6z.service.one/webroots/sites/annex27.nl/"
SRC="C:/Users/raoul/Documents/annex27"

echo "Deploying to annex27.nl..."

# Root files
for file in index.html gap-analyse.html portal.html dashboard.html bestellen.html success.html trust.html admin.html faq.html factuur.html privacy.html algemene-voorwaarden.html verwerkersovereenkomst.html nis2.html nen-7510.html blog.html rapport-voorbeeld.html werkwijze.html vergelijking.html document-preview.html iso-27001-belgie.html iso-27001-nederland.html iso-27001-kosten.html demo.html roi-calculator.html logo-preview.html gap-questions-v2.js nis2-questions.js nis2-content.js document-render.js scoring-v2.js mock-evidence.js 404.html security-policy.html analytics.js analytics-admin.js vat-rules.js robots.txt sitemap.xml .htaccess og-image.svg favicon.svg favicon-16x16.png favicon-32x32.png apple-touch-icon.png android-chrome-192x192.png android-chrome-512x512.png site.webmanifest email-logo.png; do
  if [ -f "$SRC/$file" ]; then
    echo "  Uploading $file..."
    curl -s --ftp-ssl --user "$FTP_USER" -T "$SRC/$file" "$FTP_HOST$file"
  fi
done

# .well-known folder (create if needed)
if [ -f "$SRC/.well-known/security.txt" ]; then
  echo "  Creating .well-known directory..."
  curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$SRC/.well-known/security.txt" "$FTP_HOST.well-known/security.txt"
fi

# assets/logos/ folder — SVG logo concepten
if [ -d "$SRC/assets/logos" ]; then
  for logofile in "$SRC/assets/logos"/*.svg; do
    if [ -f "$logofile" ]; then
      fname=$(basename "$logofile")
      echo "  Uploading assets/logos/$fname..."
      curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$logofile" "$FTP_HOST/assets/logos/$fname"
    fi
  done
fi

# blog/ folder (all .html articles)
if [ -d "$SRC/blog" ]; then
  for blogfile in "$SRC/blog"/*.html; do
    if [ -f "$blogfile" ]; then
      fname=$(basename "$blogfile")
      echo "  Uploading blog/$fname..."
      curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$blogfile" "$FTP_HOST/blog/$fname"
    fi
  done
fi

# sector/ folder (sector-specifieke landings)
if [ -d "$SRC/sector" ]; then
  for sf in "$SRC/sector"/*.html; do
    if [ -f "$sf" ]; then
      fname=$(basename "$sf")
      echo "  Uploading sector/$fname..."
      curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$sf" "$FTP_HOST/sector/$fname"
    fi
  done
fi

# beleidspakket/ folder — .md voor live document-render-engine + docs-metadata.json.
# PDF/DOCX versies worden apart geüpload (Word voor klant-download in ZIP-export).
if [ -d "$SRC/beleidspakket" ]; then
  if [ -f "$SRC/beleidspakket/.htaccess" ]; then
    echo "  Uploading beleidspakket/.htaccess..."
    curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$SRC/beleidspakket/.htaccess" "$FTP_HOST/beleidspakket/.htaccess"
  fi
  if [ -f "$SRC/beleidspakket/docs-metadata.json" ]; then
    echo "  Uploading beleidspakket/docs-metadata.json..."
    curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$SRC/beleidspakket/docs-metadata.json" "$FTP_HOST/beleidspakket/docs-metadata.json"
  fi
  for sub in basispakket premium werkinstructies nis2; do
    if [ -d "$SRC/beleidspakket/$sub" ]; then
      for md in "$SRC/beleidspakket/$sub"/*.md; do
        if [ -f "$md" ]; then
          fname=$(basename "$md")
          echo "  Uploading beleidspakket/$sub/$fname..."
          curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$md" "$FTP_HOST/beleidspakket/$sub/$fname"
        fi
      done
    fi
  done
  # Word-versies voor ZIP-export
  for sub in basispakket premium werkinstructies; do
    if [ -d "$SRC/beleidspakket/word/$sub" ]; then
      for docx in "$SRC/beleidspakket/word/$sub"/*.docx; do
        if [ -f "$docx" ]; then
          fname=$(basename "$docx")
          echo "  Uploading beleidspakket/word/$sub/$fname..."
          curl -s --ftp-ssl --user "$FTP_USER" --ftp-create-dirs -T "$docx" "$FTP_HOST/beleidspakket/word/$sub/$fname"
        fi
      done
    fi
  done
fi

echo "Deploy complete! Site live op https://annex27.nl"

# Ook naar GitHub pushen als er lokale wijzigingen zijn
cd "$SRC" || exit 0
if [ -n "$(git status --porcelain)" ]; then
  echo "Committing changes to GitHub..."
  git add -A
  git -c commit.gpgsign=false commit -m "deploy: $(date '+%Y-%m-%d %H:%M')" >/dev/null && git push --quiet && echo "GitHub: ok" || echo "GitHub: FAILED"
else
  echo "GitHub: niks om te committen"
fi
