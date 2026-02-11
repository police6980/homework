@echo off
echo ==========================================
echo      Starting Cloudflare Deployment
echo ==========================================
echo.
echo [1] Checking for Wrangler...
call npx --no-install wrangler --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Wrangler not found. Installing...
    call npm install -g wrangler
)

echo.
echo [2] Deploying...
echo     (If asked to install packages, type 'y' and Enter)
echo     (If asked to login, a browser window will open)
echo.

call wrangler deploy

echo.
echo ==========================================
if %errorlevel% equ 0 (
    echo      DEPLOYMENT SUCCESSFUL!
) else (
    echo      DEPLOYMENT FAILED.
    echo      Please read the error message above.
)
echo ==========================================
echo.
pause
