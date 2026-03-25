#!/bin/bash

# 제조대기자 현황판 AI - Mac 빌드 스크립트

echo ""
echo "====================================================="
echo "   제조대기자 현황판 AI - macOS 빌드 도구"
echo "====================================================="
echo ""

# Node.js 확인
echo "[1/3] Node.js 확인 중..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js가 설치되지 않았습니다!"
    echo ""
    echo "다음을 확인하세요:"
    echo "1. Node.js를 설치했나요? https://nodejs.org/"
    echo "2. 터미널을 다시 열어보세요"
    echo "3. node --version 을 입력해보세요"
    echo ""
    exit 1
fi

node --version
echo ""

# 의존성 설치
echo "[2/3] 의존성 설치 중..."
echo "이 과정은 시간이 걸릴 수 있습니다 (5-10분)..."
echo ""

npm install
if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] 의존성 설치 실패!"
    echo ""
    echo "다시 시도하려면:"
    echo "1. 인터넷 연결 확인"
    echo "2. 이 스크립트를 다시 실행하세요"
    echo ""
    exit 1
fi

echo ""
echo "[3/3] 빌드 중..."
echo "이 과정도 시간이 걸릴 수 있습니다 (5-10분)..."
echo ""

npm run build
if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] 빌드 실패!"
    exit 1
fi

npx electron-builder -m
if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] macOS 앱 생성 실패!"
    exit 1
fi

echo ""
echo "====================================================="
echo "   [OK] 빌드 완료!"
echo "====================================================="
echo ""
echo "설치 프로그램 위치:"
echo "   dist/ 폴더"
echo ""
echo "생성된 파일:"
echo "   - 제조대기자 현황판 AI-1.0.0.dmg (설치 가능)"
echo "   - 제조대기자 현황판 AI-1.0.0.zip (압축 버전)"
echo ""
echo "사용 방법:"
echo "1. .dmg 파일을 더블클릭하여 설치"
echo "2. 또는 .zip 파일을 해제하여 Applications로 드래그"
echo ""

# dist 폴더 열기
if [ -d dist ]; then
    open dist
fi
