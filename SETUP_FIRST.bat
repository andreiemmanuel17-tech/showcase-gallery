@echo off
cd /d "%~dp0client"
echo Installing Activity 1 frontend packages...
call npm install
if errorlevel 1 exit /b %errorlevel%

cd /d "%~dp0server"
echo Installing Activity 2 backend packages...
call npm install
if errorlevel 1 exit /b %errorlevel%

where code >nul 2>nul
if %errorlevel%==0 (
  echo Installing Thunder Client VS Code extension...
  call code --install-extension rangav.vscode-thunder-client
) else (
  echo VS Code code command not found. Install Thunder Client manually in Extensions.
)

cd /d "%~dp0"
echo Setup complete.
pause
