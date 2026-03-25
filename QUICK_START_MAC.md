# Mac 빠른 시작 가이드

macOS에서 제조대기자 현황판 AI 앱을 만드는 가장 쉬운 방법입니다.

## 0단계: 시스템 확인 (첫 실행 시만)

터미널을 열고 프로젝트 폴더에서:

```bash
./check-system.sh
```

필요한 것:
- ✅ Node.js (LTS 버전) - [다운로드](https://nodejs.org/)
- ✅ Xcode Command Line Tools - `xcode-select --install`

## 1단계: 빌드 시작

프로젝트 폴더에서:

```bash
./quick-build.sh
```

자동으로 진행:
1. Node.js 확인 ✓
2. 의존성 설치 (5-10분)
3. 앱 빌드 및 DMG/ZIP 생성 (5-10분)
4. dist/ 폴더 자동으로 열림

## 2단계: 완료!

### DMG 파일로 설치 (권장)
1. `제조대기자 현황판 AI-1.0.0.dmg` 더블클릭
2. 앱 아이콘을 Applications 폴더로 드래그
3. Launchpad에서 실행

### 또는 ZIP 파일로 실행
1. `제조대기자 현황판 AI-1.0.0.zip` 해제
2. 생성된 앱을 Applications로 이동
3. 더블클릭하여 실행

---

## 🔧 문제가 발생했을 때

### 스크립트 실행 안 됨
```bash
chmod +x quick-build.sh
chmod +x check-system.sh
chmod +x debug-build.sh
```

### 자세한 에러 메시지 보기
```bash
./debug-build.sh
```

### Node.js 설치 확인
```bash
node --version
npm --version
```

### Xcode 설치 확인
```bash
xcode-select -p
```
설치되지 않으면:
```bash
xcode-select --install
```

---

## 📚 다른 방법들

### 방법 B: 수동 명령
```bash
npm install
npm run build
npx electron-builder -m
```

### 방법 C: 한 줄 명령
```bash
npm install && npm run build && npx electron-builder -m
```

---

## ✅ 체크리스트

- [ ] Node.js 설치됨
- [ ] Xcode 설치됨
- [ ] 프로젝트 폴더 확인
- [ ] check-system.sh 모두 OK
- [ ] quick-build.sh 실행
- [ ] dist/ 폴더에 .dmg/.zip 생성됨
- [ ] 앱을 Applications로 이동
- [ ] 앱 실행됨 ✓

---

## 📖 자세한 가이드

더 자세한 내용은 **[BUILD_MAC.md](./BUILD_MAC.md)** 를 참고하세요.
