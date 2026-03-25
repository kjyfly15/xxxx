# 빠른 시작 가이드

## Windows에서 설치 프로그램 만드는 가장 쉬운 방법

### 0단계: 시스템 확인 (처음 할 때만)

먼저 **`check-system.bat`를 더블클릭**해서 필요한 프로그램이 설치되었는지 확인하세요.

```
check-system.bat → 더블클릭
```

필요한 것:
- ✅ Node.js (LTS 버전) - [다운로드](https://nodejs.org/)
- ✅ npm (Node.js 설치 시 자동 설치됨)

### 1단계: 빌드 시작

프로젝트 폴더에서 **`quick-build.bat`를 더블클릭**

```
quick-build.bat → 더블클릭
```

자동으로 진행:
1. Node.js 확인 ✓
2. 의존성 설치 (5-10분)
3. 빌드 및 설치 프로그램 생성 (5-10분)
4. `dist/` 폴더 자동으로 열림

### 2단계: 완료!

`dist/제조대기자현황판-1.0.0.exe` 파일을 실행하면 프로그램이 시작됩니다.

---

## 🔧 문제가 발생했을 때

### 배치 파일이 즉시 종료되는 경우

**`debug-build.bat`를 실행**해서 자세한 에러 메시지를 보세요:

```
debug-build.bat → 더블클릭
```

### "Node.js가 설치되지 않았습니다" 에러

1. [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 파일 실행 (기본 설정으로 OK)
3. **컴퓨터 재시작**
4. 다시 배치 파일 실행

### "npm install 실패" 에러

1. 인터넷 연결 확인
2. 배치 파일 다시 실행
3. 여전히 안 되면 명령 프롬프트에서 수동 실행:
   ```
   npm install
   ```

### 빌드 중간에 멈추는 경우

정상입니다! 첫 빌드는 10-20분 걸릴 수 있습니다.
- CPU와 디스크 활동을 확인하세요
- 창을 닫지 마세요

---

## 📚 다른 방법들

### 방법 B: 선택 가능한 빌드
```
build-simple.bat → 더블클릭
```

### 방법 C: 수동 명령 (명령 프롬프트)

프로젝트 폴더에서 `cmd` 입력:
```
npm install && npm run build && npx electron-builder -w --config.win.target=portable
```

---

## ✅ 체크리스트

- [ ] Node.js 설치됨
- [ ] 프로젝트 폴더 확인
- [ ] check-system.bat 모두 OK
- [ ] quick-build.bat 실행
- [ ] dist/제조대기자현황판-1.0.0.exe 생성됨
