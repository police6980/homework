@echo off
setlocal
set "ORIGINAL_DIR=%CD%"
set "TEMP_DIR=%TEMP%\homework_deploy"

echo [1/5] Cleaning up temp deploy directory at %TEMP_DIR%...
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

echo [2/5] Copying configuration files...
copy "package.json" "%TEMP_DIR%\" >nul
copy "wrangler.toml" "%TEMP_DIR%\" >nul
copy "schema.sql" "%TEMP_DIR%\" >nul

echo [3/5] Copying worker and client assets...
mkdir "%TEMP_DIR%\worker"
robocopy "worker" "%TEMP_DIR%\worker" /E /NFL /NDL /NJH /NJS
mkdir "%TEMP_DIR%\client\dist"
robocopy "client\dist" "%TEMP_DIR%\client\dist" /E /NFL /NDL /NJH /NJS

echo [4/5] Installing dependencies in temp...
cd /d "%TEMP_DIR%"
call npm install --ignore-scripts

echo [5/5] Deploying to Cloudflare...
call npx wrangler deploy

echo Done!
pause
