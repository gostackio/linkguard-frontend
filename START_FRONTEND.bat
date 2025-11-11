@echo off
echo ========================================
echo   LinkGuard Frontend Server
echo ========================================
echo.

cd /d %~dp0

echo Step 1: Checking if Vite is installed...
if exist node_modules\.bin\vite.cmd (
    echo ✅ Vite is installed!
    echo.
    echo Step 2: Starting server...
    echo Frontend will be available at: http://localhost:3000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    call node_modules\.bin\vite.cmd
    pause
    exit /b 0
)

echo ❌ Vite is not installed!
echo.
echo Step 2: Installing Vite (this will take 1-2 minutes)...
echo Please wait, do not close this window...
echo.

call npm install vite@4.5.3 @vitejs/plugin-react --save-dev --legacy-peer-deps --no-audit --no-fund

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Installation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ✅ Installation complete!
echo.
echo Step 3: Starting server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call node_modules\.bin\vite.cmd

pause

