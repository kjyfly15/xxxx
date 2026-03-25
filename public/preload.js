const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveQueueData: (data) => ipcRenderer.invoke('save-queue-data', data),
  loadQueueData: () => ipcRenderer.invoke('load-queue-data'),
  analyzeQueue: (data) => ipcRenderer.invoke('analyze-queue', data)
});
