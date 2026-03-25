Write-Host "========================================" -ForegroundColor Cyan
Write-Host "제조대기자 현황판 AI 빌드 도구" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Node.js 설치 확인
$node = Get-Command node -ErrorAction SilentlyContinue
if ($null -eq $node) {
    Write-Host "❌ Node.js가 설치되지 않았습니다." -ForegroundColor Red
    Write-Host "Node.js를 먼저 설치해주세요: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Node.js 설치 확인됨" -ForegroundColor Green
Write-Host ""

# 의존성 설치
Write-Host "📦 의존성 설치 중..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 의존성 설치 실패" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ 의존성 설치 완료" -ForegroundColor Green
Write-Host ""

# 빌드 옵션 선택
Write-Host "빌드 타입을 선택하세요:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Portable 버전 (추천 - 설치 불필요)"
Write-Host "2. NSIS 설치 프로그램"
Write-Host "3. 둘 다"
Write-Host ""

$choice = Read-Host "선택 (1-3)"

Write-Host ""

if ($choice -eq "1") {
    Write-Host "🔨 Portable 버전 빌드 중..." -ForegroundColor Cyan
    npm run build
    npx electron-builder -w --config.win.target=portable
}
elseif ($choice -eq "2") {
    Write-Host "🔨 NSIS 설치 프로그램 빌드 중..." -ForegroundColor Cyan
    npm run build
    npx electron-builder -w --config.win.target=nsis
}
elseif ($choice -eq "3") {
    Write-Host "🔨 모든 버전 빌드 중..." -ForegroundColor Cyan
    npm run build
    npx electron-builder -w
}
else {
    Write-Host "❌ 잘못된 선택입니다." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 빌드 완료!" -ForegroundColor Green
    Write-Host "📁 설치 프로그램 위치: dist/ 폴더" -ForegroundColor Green
    Write-Host ""
    Invoke-Item dist
}
else {
    Write-Host "❌ 빌드 실패" -ForegroundColor Red
}

Read-Host "Press Enter to exit"
