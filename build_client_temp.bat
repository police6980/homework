@echo off
set "ORIGINAL_DIR=%CD%"
set "TEMP_DIR=%TEMP%\homework_build"

echo Setting up temp build directory at %TEMP_DIR%...
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

echo Copying client files to temp...
xcopy /E /I /Y "client" "%TEMP_DIR%\client"

echo Installing dependencies in temp (this might take a minute)...
cd /d "%TEMP_DIR%\client"
call npm install

echo Building client...
call npm run build

echo Copying built assets back to Google Drive...
if exist "%ORIGINAL_DIR%\client\dist" rmdir /s /q "%ORIGINAL_DIR%\client\dist"
xcopy /E /I /Y "dist" "%ORIGINAL_DIR%\client\dist"

echo Done!
cd /d "%ORIGINAL_DIR%"
pause
