@echo off
echo Installing LinkGuard Frontend Dependencies...
echo.

cd /d %~dp0

echo Step 1: Cleaning previous installations...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json

echo.
echo Step 2: Installing dependencies (this may take a few minutes)...
call npm install --legacy-peer-deps --no-audit --no-fund

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo Step 3: Starting development server...
echo.
echo Frontend will be available at: http://localhost:3000
echo.
call npm run dev

pause

