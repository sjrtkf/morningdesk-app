$ErrorActionPreference = "Stop"
$shortcut = Join-Path ([Environment]::GetFolderPath("Startup")) "MorningDesk.url"

if (Test-Path -LiteralPath $shortcut) {
  Remove-Item -LiteralPath $shortcut
  Write-Output "MorningDesk startup shortcut removed."
} else {
  Write-Output "MorningDesk startup shortcut was not installed."
}
