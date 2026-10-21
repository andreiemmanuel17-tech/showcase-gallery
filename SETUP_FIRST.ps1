Write-Host "Installing Activity 1 frontend packages..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\client"
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Installing Activity 2 backend packages..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\server"
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Installing the Thunder Client VS Code extension if the code command is available..." -ForegroundColor Cyan
if (Get-Command code -ErrorAction SilentlyContinue) {
  code --install-extension rangav.vscode-thunder-client
} else {
  Write-Host "VS Code 'code' command was not found. Install Thunder Client manually from the Extensions tab." -ForegroundColor Yellow
}

Set-Location $PSScriptRoot
Write-Host "Setup complete. client and server dependencies are installed." -ForegroundColor Green
