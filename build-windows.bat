@echo off
chcp 65001 >nul
echo.
echo ========================================
echo  Manufacturing Queue Board AI Installer
echo ========================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed
echo.

REM Build selection
echo Select build type:
echo.
echo  1. Portable version (Recommended - no installation needed)
echo  2. NSIS Installer
echo  3. Both versions
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo [INFO] Building Portable version...
    call npm run build
    call npx electron-builder -w --config.win.target=portable
    goto :success
)

if "%choice%"=="2" (
    echo.
    echo [INFO] Building NSIS Installer...
    call npm run build
    call npx electron-builder -w --config.win.target=nsis
    goto :success
)

if "%choice%"=="3" (
    echo.
    echo [INFO] Building all versions...
    call npm run build
    call npx electron-builder -w
    goto :success
)

echo [ERROR] Invalid selection
pause
exit /b 1

:success
echo.
if errorlevel 0 (
    echo [OK] Build completed!
    echo [INFO] Installer location: dist/ folder
    echo.
    explorer dist
) else (
    echo [ERROR] Build failed
)

pause
