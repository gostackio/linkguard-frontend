@echo off
echo ========================================
echo LinkGuard Frontend Server
echo ========================================
echo.

cd /d %~dp0

echo Checking if dependencies are installed...
if not exist node_modules (
    echo.
    echo ERROR: Dependencies not installed!
    echo.
    echo Please run: install-deps.bat
    echo Or run: npm install --legacy-peer-deps
    echo.
    pause
    exit /b 1
)

echo.
echo Starting development server...
echo Frontend will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause

