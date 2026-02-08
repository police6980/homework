@echo off
echo ==========================================
echo Starting Homework App...
echo ==========================================

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

:: Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] node_modules folder is missing!
    echo Please run 'install_server_temp.bat' first.
    pause
    exit /b
)

if not exist "client\dist" (
    echo [ERROR] client build is missing!
    echo Please run 'build_client_temp.bat' first.
    pause
    exit /b
)

:: Set Port
set PORT=5001

:: Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] node_modules folder is missing!
    echo Please run 'install_server_temp.bat' first to install dependencies.
    pause
    exit /b
)

:: Start the server in a new window
echo Starting Server...
start "Homework App Server" cmd /k "set PORT=%PORT% && node server/index.js"

:: Wait for server to initialize
echo Waiting for server to start...
timeout /t 5 >nul

:: Try to open with Chrome if available
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:%PORT%"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:%PORT%"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    start "" "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" "http://localhost:%PORT%"
) else (
    echo Chrome not found, opening default browser...
    start http://localhost:%PORT%
)

echo.
echo App started! You can close this window now.
echo (Do NOT close the "Homework App Server" window)
pause
