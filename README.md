# 🏭 제조대기자 현황판 AI

Windows 컴퓨터에 설치하여 사용할 수 있는 제조 대기자 관리 애플리케이션입니다. 인공지능 기반의 분석과 최적화 기능을 제공합니다.

## 🚀 주요 기능

- **현황판**: 실시간 제조 대기자 현황 관리
- **AI 분석**: 대기시간, 병목 지점 등 자동 분석
- **스마트 권장사항**: AI가 생성한 최적화 제안
- **우선순위 관리**: 작업 우선순위 자동 조정
- **데이터 저장**: 로컬에 데이터 자동 저장

## 📋 시스템 요구사항

- Windows 10 이상
- Node.js 14.0 이상
- 최소 2GB RAM

## 💾 설치 방법

### Windows에서 설치 프로그램 생성

**Windows가 설치된 컴퓨터에서:**

자세한 방법은 **[QUICK_START.md](./QUICK_START.md)** 참고

### macOS에서 설치 프로그램 생성

**Mac이 설치된 컴퓨터에서:**

#### 방법 1: 자동 빌드 (추천)
```bash
./quick-build.sh
```

#### 방법 2: 수동 빌드
```bash
chmod +x quick-build.sh     # 첫 실행 시만
./quick-build.sh
```

#### 방법 3: 명령어로 빌드
```bash
npm install
npm run build
npx electron-builder -m
```

생성되는 파일:
- **DMG**: `제조대기자 현황판 AI-1.0.0.dmg` (설치 관리자)
- **ZIP**: `제조대기자 현황판 AI-1.0.0.zip` (압축 파일)

자세한 방법은 **[QUICK_START_MAC.md](./QUICK_START_MAC.md)** 참고

### 빌드 결과

#### Windows
- **Portable**: `제조대기자현황판-1.0.0.exe` (~200MB)
- **NSIS 설치**: `제조대기자 현황판 AI Setup 1.0.0.exe` (~150MB)

#### macOS
- **DMG**: `제조대기자 현황판 AI-1.0.0.dmg` (~200MB)
- **ZIP**: `제조대기자 현황판 AI-1.0.0.zip` (~100MB)

### 개발 환경에서 테스트

```bash
# 1단계: 저장소 클론
git clone <repository-url>
cd manufacturing-queue-board-ai

# 2단계: 의존성 설치
npm install

# 3단계: 개발 서버 + Electron 실행
npm run electron-dev
```

## 📖 사용 방법

### 현황판 탭
- 현재 대기 중인 모든 제조 작업을 확인할 수 있습니다.
- 상태 변경, 대기시간 업데이트, 작업 완료 처리가 가능합니다.
- 우선순위와 작업 유형으로 정렬할 수 있습니다.

### 대기자 추가 탭
- 새로운 제조 작업을 추가합니다.
- 필수 정보: 제품명
- 선택 정보: 수량, 작업 유형, 우선순위, 메모

### AI 분석 탭
- AI가 분석한 현황판 데이터를 시각화하여 표시합니다.
- 평균 대기시간, 예상 완료시간 등 주요 지표 확인
- 작업 유형별, 우선순위별, 상태별 분포 차트
- AI 권장사항과 병목 분석 결과
- 최적화 전략 제안

## 🤖 AI 기능

### 자동 분석
- 평균 대기시간 계산
- 우선순위 분석
- 작업 유형 분포 분석
- 병목 지점 자동 감지

### 스마트 권장사항
- 대기시간 초과 시 인력 추가 권장
- 우선순위 높은 작업 즉시 처리 권장
- 병렬 처리 증대 권장

## 🔧 기술 스택

- **Frontend**: React 18
- **Desktop**: Electron 27
- **UI Framework**: Chart.js
- **Data Storage**: electron-store
- **Build Tool**: electron-builder

## 📁 프로젝트 구조

```
manufacturing-queue-board-ai/
├── public/
│   ├── electron.js        # Electron 메인 프로세스
│   ├── preload.js         # IPC 보안 브릿지
│   └── index.html         # HTML 템플릿
├── src/
│   ├── App.jsx            # 메인 애플리케이션
│   ├── App.css
│   └── components/
│       ├── QueueBoard.jsx # 현황판 컴포넌트
│       ├── AddQueue.jsx   # 대기자 추가 컴포넌트
│       ├── AIAnalysis.jsx # AI 분석 컴포넌트
│       └── *.css          # 스타일 파일
├── package.json
├── .gitignore
└── README.md
```

## 🎯 최적화 기능

AI 분석을 통해 다음과 같은 최적화 방안을 제안합니다:

1. **우선순위 조정** - 높은 우선순위 작업 우선 처리
2. **병렬 처리 증대** - 병목 작업에 자원 할당
3. **인력 재배치** - 작업 부하에 따른 인력 배치
4. **일정 계획** - 예상 완료시간 기반 계획

## 💾 데이터 저장

모든 대기자 데이터는 로컬 컴퓨터에 자동으로 저장됩니다.
- 저장 위치: `%APPDATA%/manufacturing-queue-board-ai/`
- JSON 형식으로 저장됨

## 🐛 문제 해결

### 앱이 실행되지 않는 경우
1. Node.js 버전 확인: `node --version`
2. 의존성 재설치: `npm install`
3. 캐시 삭제: `npm cache clean --force`

### 데이터가 저장되지 않는 경우
1. 저장 위치의 권한 확인
2. 애플리케이션 재시작

## 📝 라이선스

MIT License

## 💬 피드백 및 지원

문제가 발생하거나 기능 요청이 있으면 이슈를 등록해주세요.

---

**마지막 업데이트**: 2026년 3월
