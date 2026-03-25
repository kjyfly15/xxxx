@echo off
REM 디버그 모드 - 모든 명령과 에러를 표시합니다
setlocal enabledelayedexpansion

echo.
echo ========== DEBUG MODE ==========
echo All commands and errors will be shown
echo ===================================
echo.

REM Check Node.js
echo [CHECK] Node.js installation...
where node
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)

node --version
npm --version
echo.

REM Check project folder
echo [CHECK] Project folder structure...
dir /B
echo.

REM Install dependencies
echo [STEP 1] Installing dependencies...
echo Running: npm install
call npm install
echo Return code: !errorlevel!
echo.

REM Build
echo [STEP 2] Building React app...
echo Running: npm run build
call npm run build
echo Return code: !errorlevel!
echo.

REM Create installer
echo [STEP 3] Creating installer...
echo Running: npx electron-builder -w
call npx electron-builder -w
echo Return code: !errorlevel!
echo.

REM Check results
echo [CHECK] Results...
if exist dist (
    echo dist/ folder contents:
    dir dist /B
) else (
    echo ERROR: dist/ folder not created!
)

echo.
echo [COMPLETE]
pause
