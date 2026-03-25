# macOS 빌드 가이드

Mac에서 제조대기자 현황판 AI 설치 프로그램을 만드는 방법입니다.

## 📋 사전 준비

### 1. Node.js 설치
- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
- .pkg 파일 실행하여 설치
- 터미널에서 확인: `node --version`

### 2. Xcode Command Line Tools 설치
```bash
xcode-select --install
```

## 🚀 빌드 방법

### 방법 1: 자동 빌드 (추천)

터미널을 열고 프로젝트 폴더에서:

```bash
./quick-build.sh
```

또는 finder에서 파일을 더블클릭하면 터미널에서 실행됩니다.

### 방법 2: 수동 빌드

```bash
# 1. 시스템 확인 (첫 실행 시)
./check-system.sh

# 2. 의존성 설치
npm install

# 3. 빌드
npm run build

# 4. macOS 앱 생성
npx electron-builder -m
```

### 방법 3: 한 줄 명령어

```bash
npm install && npm run build && npx electron-builder -m
```

## 📦 생성되는 파일

빌드 완료 후 `dist/` 폴더에 생성됩니다:

### 1. DMG 파일 (권장)
```
제조대기자 현황판 AI-1.0.0.dmg (~200MB)
```
- 더블클릭하면 설치 창이 열림
- Applications 폴더로 드래그하여 설치
- 보기 좋음

### 2. ZIP 파일
```
제조대기자 현황판 AI-1.0.0.zip (~100MB)
```
- 자동으로 압축 해제됨
- 바로 응용 프로그램으로 실행 가능

## 🔧 문제 해결

### "command not found: node"
Node.js가 설치되지 않았습니다.
1. [Node.js 다운로드](https://nodejs.org/)
2. .pkg 파일 실행하여 설치
3. 터미널 재시작

### "permission denied"
스크립트에 실행 권한이 없습니다.
```bash
chmod +x quick-build.sh
chmod +x debug-build.sh
chmod +x check-system.sh
```

### "Xcode command line tools not found"
```bash
xcode-select --install
```

### 빌드 중 오류 발생

디버그 모드로 실행:
```bash
./debug-build.sh
```

상세한 에러 메시지가 표시됩니다.

## 📱 설치 및 실행

### DMG 파일로 설치
1. `제조대기자 현황판 AI-1.0.0.dmg` 더블클릭
2. 설치 창에서 앱 아이콘을 Applications 폴더로 드래그
3. Launchpad에서 "제조대기자 현황판 AI" 찾아 실행

### ZIP 파일로 실행
1. `제조대기자 현황판 AI-1.0.0.zip` 해제
2. 생성된 앱을 Applications 폴더로 이동
3. Finder에서 앱 더블클릭

## 💡 팁

- 첫 빌드는 10-20분 걸릴 수 있습니다
- 이후 빌드는 더 빠릅니다
- 빌드 중 CPU 사용량이 높을 수 있습니다 (정상)
- M1/M2 Mac도 지원됩니다

## 🔐 코드 서명 (선택사항)

배포할 때 코드 서명을 추가하려면:

```bash
# 개발자 인증서가 필요합니다
# Apple Developer 계정 필요

# package.json의 mac 섹션에 다음 추가:
"mac": {
  "certificateFile": "path/to/cert.p12",
  "certificatePassword": "password",
  "identity": "Your Name"
}
```

## 📞 문제가 계속 되면

터미널에서 다음 명령을 실행해서 출력 결과를 확인하세요:

```bash
./debug-build.sh
```

또는 모든 캐시를 삭제하고 다시 시도:

```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
npx electron-builder -m
```
