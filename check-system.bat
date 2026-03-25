@echo off
chcp 65001 >nul 2>&1

echo.
echo ====== System Check ======
echo.

REM Check Node.js
echo [1] Node.js:
node --version 2>nul
if errorlevel 1 (
    echo    NOT INSTALLED - Please install from https://nodejs.org/
) else (
    echo    OK
)
echo.

REM Check npm
echo [2] npm:
npm --version 2>nul
if errorlevel 1 (
    echo    NOT INSTALLED
) else (
    echo    OK
)
echo.

REM Check git
echo [3] Git:
git --version 2>nul
if errorlevel 1 (
    echo    NOT INSTALLED (optional)
) else (
    echo    OK
)
echo.

REM Check disk space
echo [4] Current folder:
echo    %CD%
echo.

REM Check if node_modules exists
echo [5] node_modules:
if exist node_modules (
    echo    EXISTS
) else (
    echo    NOT FOUND - Run npm install first
)
echo.

REM Check if package.json exists
echo [6] package.json:
if exist package.json (
    echo    EXISTS
) else (
    echo    NOT FOUND - Make sure you're in the right folder
)
echo.

echo ===========================
echo If anything shows NOT INSTALLED, you need to install it first.
echo.

pause
