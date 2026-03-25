@echo off
REM 한글 출력을 위해 인코딩 설정
chcp 65001 >nul 2>&1

echo.
echo ===================================================
echo    제조대기자 현황판 AI - 빌드 도구
echo ===================================================
echo.

REM Node.js 설치 확인
echo [1/3] Node.js 확인 중...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js가 설치되지 않았습니다!
    echo.
    echo 다음을 확인하세요:
    echo 1. Node.js를 설치했나요? https://nodejs.org/
    echo 2. 컴퓨터를 재시작했나요?
    echo 3. npm --version을 명령 프롬프트에서 실행해보세요
    echo.
    pause
    exit /b 1
)

node --version
echo.

REM 의존성 설치
echo [2/3] 의존성 설치 중...
echo 이 과정은 시간이 걸릴 수 있습니다 (5-10분)...
echo.
call npm install
if errorlevel 1 (
    echo.
    echo [ERROR] 의존성 설치 실패!
    echo.
    echo 다시 시도하려면:
    echo 1. 인터넷 연결 확인
    echo 2. 배치 파일을 다시 실행하세요
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] 빌드 중...
echo 이 과정도 시간이 걸릴 수 있습니다 (5-10분)...
echo.

REM Build and package
call npm run build
if errorlevel 1 (
    echo.
    echo [ERROR] 빌드 실패!
    pause
    exit /b 1
)

call npx electron-builder -w --config.win.target=portable
if errorlevel 1 (
    echo.
    echo [ERROR] 설치 프로그램 생성 실패!
    pause
    exit /b 1
)

echo.
echo ===================================================
echo   [OK] 빌드 완료!
echo ===================================================
echo.
echo 설치 프로그램 위치:
echo   dist/제조대기자현황판-1.0.0.exe
echo.
echo 이 파일을 실행하면 프로그램이 시작됩니다.
echo.

REM Open dist folder
if exist dist (
    explorer dist
)

pause
