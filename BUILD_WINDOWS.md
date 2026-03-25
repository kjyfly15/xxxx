# Windows 설치 프로그램 빌드 가이드

이 문서는 Windows 환경에서 제조대기자 현황판 AI 설치 프로그램을 빌드하는 방법을 설명합니다.

## 📋 사전 준비

다음 프로그램들을 Windows에 설치해야 합니다:

### 1. Node.js 설치
- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
- 설치 파일 실행하여 설치 (기본 설정으로 OK)
- 설치 확인: 명령 프롬프트에서 `node --version` 입력

### 2. Git 설치 (선택사항)
- [Git 공식 사이트](https://git-scm.com/)에서 다운로드
- 설치 파일 실행하여 설치

## 🚀 빌드 방법

### 1단계: 프로젝트 폴더 열기

Windows 탐색기에서 프로젝트 폴더로 이동합니다.

### 2단계: 명령 프롬프트 열기

프로젝트 폴더 경로 위에 `cmd`를 입력하여 명령 프롬프트를 엽니다.
또는 `Shift + 마우스 우클릭` → "여기서 PowerShell 열기"

### 3단계: 의존성 설치

```bash
npm install
```

### 4단계: 설치 프로그램 빌드

#### 옵션 A: Portable 버전 (추천 - 설치 불필요)
```bash
npm run build && npx electron-builder -w --config.win.target=portable
```

결과: `dist/제조대기자현황판-1.0.0.exe` (약 200MB)
- 클릭하면 바로 실행됨
- 설치 과정 없음
- 빠른 실행

#### 옵션 B: NSIS 설치 프로그램
```bash
npm run build && npx electron-builder -w --config.win.target=nsis
```

결과: `dist/제조대기자 현황판 AI Setup 1.0.0.exe` (약 150MB)
- 설치 마법사 제공
- 시작 메뉴에 바로가기 생성
- 제어판에서 제거 가능

## ✅ 빌드 완료

빌드가 완료되면 `dist/` 폴더에 설치 프로그램이 생성됩니다.

## 🔧 문제 해결

### 에러: "npm is not recognized"
- Node.js를 다시 설치하고 컴퓨터를 재시작하세요.

### 에러: "python2 is not installed"
- 다음 명령을 실행하세요:
```bash
npm install --global windows-build-tools
```

### 빌드가 매우 느린 경우
- 백신 프로그램 잠시 비활성화
- 충분한 디스크 공간 확인 (최소 2GB)

## 📝 참고사항

- 첫 빌드는 시간이 걸릴 수 있습니다 (5-10분)
- 이후 빌드는 더 빠릅니다
- 빌드 중 인터넷 연결이 필요합니다

## 💾 배포

빌드 완료된 `.exe` 파일을 다른 Windows PC에서 직접 실행할 수 있습니다.
