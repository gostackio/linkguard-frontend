@echo off
echo ========================================
echo LinkGuard Frontend - Dependency Installer
echo ========================================
echo.

cd /d %~dp0

echo Checking Node.js version...
node --version
echo.

echo Step 1: Cleaning previous installation...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del /f /q package-lock.json
)

echo.
echo Step 2: Installing dependencies...
echo This may take 3-5 minutes. Please be patient...
echo.

call npm install --legacy-peer-deps --no-audit --no-fund

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo ERROR: Installation failed!
    echo ========================================
    echo.
    echo Please try:
    echo 1. Check your internet connection
    echo 2. Run as administrator
    echo 3. Try: npm cache clean --force
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Or double-click: start.bat
echo.
pause

