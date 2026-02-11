@echo off
echo ==================================================
echo   Starting Homework App + Magic Internet Link
echo ==================================================

:: 1. Start the Backend Server in a new window
echo [1/2] Starting Server...
start "Homework Server" cmd /k "cd server && node index.js"

:: Wait 3 seconds for server to load
timeout /t 3 >nul

:: 2. Start the Tunnel in this window
echo [2/2] Connecting to Internet...
echo.
echo   --------------------------------------------------------
echo   COPY THE URL BELOW (It looks like https://....serveo.net)
echo   --------------------------------------------------------
echo.
ssh -o StrictHostKeyChecking=no -R 80:localhost:5000 serveo.net

pause
