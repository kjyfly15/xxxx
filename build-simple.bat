@echo off
echo.
echo ===== Manufacturing Queue Board AI =====
echo.
echo Installing dependencies...
call npm install

echo.
echo Building React app...
call npm run build

echo.
echo Building Windows installer...
call npx electron-builder -w

echo.
echo Build completed! Check dist/ folder for installer.
echo.
pause
