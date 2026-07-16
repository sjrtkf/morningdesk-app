$ErrorActionPreference = "Stop"
$taskName = "MorningDesk Daily Briefing"

if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
  Write-Output "MorningDesk daily briefing task removed."
} else {
  Write-Output "MorningDesk daily briefing task was not installed."
}
