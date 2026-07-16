param(
  [string]$Url = "https://sjrtkf.github.io/morningdesk-app/"
)

$ErrorActionPreference = "Stop"
$startup = [Environment]::GetFolderPath("Startup")
$shortcut = Join-Path $startup "MorningDesk.url"

@"
[InternetShortcut]
URL=$Url
IconFile=$env:SystemRoot\System32\SHELL32.dll
IconIndex=220
"@ | Set-Content -LiteralPath $shortcut -Encoding ascii

Write-Output "MorningDesk startup shortcut installed: $shortcut"
