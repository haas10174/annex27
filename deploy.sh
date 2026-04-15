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
for file in index.html gap-analyse.html portal.html dashboard.html bestellen.html success.html trust.html admin.html faq.html factuur.html analytics.js robots.txt sitemap.xml .htaccess og-image.svg favicon.svg favicon-16x16.png favicon-32x32.png apple-touch-icon.png android-chrome-192x192.png android-chrome-512x512.png site.webmanifest; do
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
