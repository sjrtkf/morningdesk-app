$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repo

git pull --ff-only origin main
if ($LASTEXITCODE -ne 0) { throw "Could not update the MorningDesk repository." }

node scripts/update-briefing.mjs
if ($LASTEXITCODE -ne 0) { throw "Briefing generation failed; the previous briefing remains published." }

node --test scripts/update-briefing.test.mjs
if ($LASTEXITCODE -ne 0) { throw "Briefing tests failed; nothing was published." }

git diff --quiet -- data/live-briefing.json
if ($LASTEXITCODE -eq 0) {
  Write-Output "The daily briefing is already current."
  exit 0
}

git add data/live-briefing.json
git commit -m "Update daily briefing $(Get-Date -Format yyyy-MM-dd)"
if ($LASTEXITCODE -ne 0) { throw "Could not commit the daily briefing." }

git push origin main
if ($LASTEXITCODE -ne 0) { throw "Could not publish the daily briefing." }

Write-Output "Daily MorningDesk briefing published."
