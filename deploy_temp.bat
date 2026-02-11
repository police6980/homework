@echo off
setlocal
set "ORIGINAL_DIR=%CD%"
set "TEMP_DIR=%TEMP%\homework_deploy_v10"

echo [1/6] Cleaning up temp deploy directory at %TEMP_DIR%...
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

echo [2/6] Copying source files to TEMP (bypassing Google Drive)...
rem Copy server/worker files
mkdir "%TEMP_DIR%\worker"
robocopy "worker" "%TEMP_DIR%\worker" /E /NFL /NDL /NJH /NJS
copy "package.json" "%TEMP_DIR%\" >nul
copy "wrangler.toml" "%TEMP_DIR%\" >nul
copy "schema.sql" "%TEMP_DIR%\" >nul

rem Copy client source
mkdir "%TEMP_DIR%\client"
robocopy "client" "%TEMP_DIR%\client" /E /XD node_modules dist /NFL /NDL /NJH /NJS

echo [3/6] Installing Client Dependencies in TEMP...
cd /d "%TEMP_DIR%\client"
call npm install

echo [4/6] Building Client in TEMP...
call npm run build

rem Verify build success
if not exist "dist\index.html" (
    echo BUILD FAILED! dist\index.html not found.
    pause
    exit /b 1
)

echo [5/6] Preparing Deployment Structure...
echo [5/7] Preparing Deployment Structure...
rem Move built assets to where wrangler expects them relative to root
rem wrangler.toml matches [site] bucket = "./client/dist"
rem dist is currently in %TEMP_DIR%\client\dist, which is correct.

cd /d "%TEMP_DIR%"
echo [6/7] ensuring Database Schema (Table Creation & Seeding)...
call npx wrangler d1 execute homework-db --file=schema.sql --remote

echo [7/7] Deploying to Cloudflare...
call npm run deploy

echo.
echo Done! Success!
pause
