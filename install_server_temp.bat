@echo off
set "ORIGINAL_DIR=%CD%"
set "TEMP_DIR=%TEMP%\homework_server_install"

echo Setting up temp directory for server install at %TEMP_DIR%...
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

echo Copying package configurations...
copy "package.json" "%TEMP_DIR%" >nul
if exist "package-lock.json" copy "package-lock.json" "%TEMP_DIR%" >nul

echo Installing production dependencies in temp...
cd /d "%TEMP_DIR%"
call npm install --omit=dev --no-bin-links --ignore-scripts

echo Copying node_modules back to Google Drive (this may take a moment)...
if exist "%ORIGINAL_DIR%\node_modules" rmdir /s /q "%ORIGINAL_DIR%\node_modules"
xcopy /E /I /Y "node_modules" "%ORIGINAL_DIR%\node_modules" >nul

echo Server dependencies installed!
cd /d "%ORIGINAL_DIR%"
rmdir /s /q "%TEMP_DIR%"
pause
