# 빠른 시작 가이드

## Windows에서 설치 프로그램 만드는 가장 쉬운 방법

### 1단계: Node.js 설치
[Node.js 다운로드](https://nodejs.org/) → LTS 버전 설치 → 컴퓨터 재시작

### 2단계: 빌드

프로젝트 폴더에서 **아래 중 하나를 선택**:

#### 방법 A: 빠른 빌드 (추천)
```
quick-build.bat를 더블클릭
```
- 가장 빠름
- Portable 버전만 생성 (바로 실행 가능)

#### 방법 B: 고급 선택
```
build-windows.bat를 더블클릭
```
- 빌드 타입 선택 가능
- Portable 또는 설치 프로그램 선택

#### 방법 C: 수동 명령
명령 프롬프트에 붙여넣기:
```
npm install && npm run build && npx electron-builder -w
```

## 완료!

빌드가 끝나면 `dist/` 폴더에 설치 프로그램이 생성됩니다.

```
제조대기자현황판-1.0.0.exe  ← 이 파일을 실행하면 됩니다!
```

## 문제 해결

**"npm is not recognized" 에러가 나는 경우:**
- Node.js를 다시 설치하고 컴퓨터를 재시작하세요.

**"PowerShell 실행 정책" 에러:**
- PowerShell을 관리자 모드로 열고 다음 명령 실행:
  ```
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

**빌드가 실패하는 경우:**
- 인터넷 연결 확인
- 백신 프로그램 임시 비활성화 시도
- 충분한 디스크 공간 확보 (최소 3GB)
