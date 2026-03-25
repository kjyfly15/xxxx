const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

const store = new Store();
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC 핸들러 - 대기자 데이터 저장
ipcMain.handle('save-queue-data', async (event, data) => {
  store.set('queueData', data);
  return { success: true };
});

// IPC 핸들러 - 대기자 데이터 로드
ipcMain.handle('load-queue-data', async (event) => {
  return store.get('queueData', []);
});

// IPC 핸들러 - AI 분석 요청
ipcMain.handle('analyze-queue', async (event, queueData) => {
  const analysis = analyzeQueue(queueData);
  return analysis;
});

// AI 분석 함수
function analyzeQueue(queueData) {
  if (!queueData || queueData.length === 0) {
    return {
      avgWaitTime: 0,
      estimatedCompletionTime: null,
      recommendations: [],
      bottlenecks: []
    };
  }

  // 평균 대기 시간 계산
  const avgWaitTime = queueData.reduce((sum, item) => sum + (item.waitTime || 0), 0) / queueData.length;

  // 우선순위별 분석
  const highPriorityCount = queueData.filter(item => item.priority === 'high').length;
  const normalPriorityCount = queueData.filter(item => item.priority === 'normal').length;

  // 권장사항 생성
  const recommendations = [];
  if (avgWaitTime > 60) {
    recommendations.push('⚠️ 평균 대기 시간이 높습니다. 인력 추가를 고려하세요.');
  }
  if (highPriorityCount > queueData.length * 0.3) {
    recommendations.push('⚠️ 우선순위가 높은 작업이 많습니다. 즉시 처리를 권장합니다.');
  }
  if (queueData.length > 10) {
    recommendations.push('⚠️ 대기열에 작업이 많습니다. 병렬 처리를 고려하세요.');
  }

  // 병목 분석
  const bottlenecks = [];
  const workTypeCount = {};
  queueData.forEach(item => {
    workTypeCount[item.workType] = (workTypeCount[item.workType] || 0) + 1;
  });

  Object.entries(workTypeCount).forEach(([type, count]) => {
    if (count > queueData.length * 0.4) {
      bottlenecks.push(`${type} 작업 병목: ${count}건`);
    }
  });

  // 완료 예상 시간
  const estimatedCompletionTime = calculateEstimatedTime(queueData);

  return {
    avgWaitTime: Math.round(avgWaitTime),
    totalItems: queueData.length,
    highPriorityCount,
    normalPriorityCount,
    estimatedCompletionTime,
    recommendations,
    bottlenecks,
    workTypeDistribution: workTypeCount
  };
}

// 완료 예상 시간 계산
function calculateEstimatedTime(queueData) {
  const avgProcessingTime = 15; // 분 단위
  return queueData.length * avgProcessingTime;
}

// 메뉴 설정
const template = [
  {
    label: '파일',
    submenu: [
      {
        label: '종료',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: '도움말',
    submenu: [
      {
        label: '정보',
        click: () => {
          // 정보 창 표시
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
