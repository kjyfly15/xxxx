@echo off
chcp 65001 >nul
echo ========================================
echo 제조대기자 현황판 AI 빌드 도구
echo ========================================
echo.

REM Node.js 설치 확인
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js가 설치되지 않았습니다.
    echo Node.js를 먼저 설치해주세요: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js 설치 확인됨
echo.

REM 의존성 설치
echo 📦 의존성 설치 중...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 의존성 설치 실패
    pause
    exit /b 1
)

echo ✓ 의존성 설치 완료
echo.

REM 빌드 옵션 선택
echo 빌드 타입을 선택하세요:
echo.
echo 1. Portable 버전 (추천 - 설치 불필요)
echo 2. NSIS 설치 프로그램
echo 3. 둘 다
echo.

set /p choice="선택 (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🔨 Portable 버전 빌드 중...
    call npm run build
    call npx electron-builder -w --config.win.target=portable
    goto :success
)

if "%choice%"=="2" (
    echo.
    echo 🔨 NSIS 설치 프로그램 빌드 중...
    call npm run build
    call npx electron-builder -w --config.win.target=nsis
    goto :success
)

if "%choice%"=="3" (
    echo.
    echo 🔨 모든 버전 빌드 중...
    call npm run build
    call npx electron-builder -w
    goto :success
)

echo ❌ 잘못된 선택입니다.
pause
exit /b 1

:success
echo.
if %errorlevel% equ 0 (
    echo ✓ 빌드 완료!
    echo 📁 설치 프로그램 위치: dist/ 폴더
    echo.
    explorer dist
) else (
    echo ❌ 빌드 실패
)

pause
