import React, { useState, useEffect } from 'react';
import './App.css';
import QueueBoard from './components/QueueBoard';
import AIAnalysis from './components/AIAnalysis';
import AddQueue from './components/AddQueue';

function App() {
  const [queueData, setQueueData] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('board');

  // 앱 시작 시 저장된 데이터 로드
  useEffect(() => {
    loadQueueData();
  }, []);

  // 대기자 데이터 변경 시 AI 분석 실행
  useEffect(() => {
    if (queueData.length > 0) {
      analyzeQueue();
    }
  }, [queueData]);

  const loadQueueData = async () => {
    try {
      const data = await window.electronAPI.loadQueueData();
      setQueueData(data || []);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  const saveQueueData = async (data) => {
    try {
      await window.electronAPI.saveQueueData(data);
      setQueueData(data);
    } catch (error) {
      console.error('데이터 저장 실패:', error);
    }
  };

  const analyzeQueue = async () => {
    try {
      const result = await window.electronAPI.analyzeQueue(queueData);
      setAnalysis(result);
    } catch (error) {
      console.error('분석 실패:', error);
    }
  };

  const addQueue = (newItem) => {
    const updatedData = [
      ...queueData,
      {
        id: Date.now(),
        ...newItem,
        status: 'waiting',
        createdAt: new Date().toLocaleString('ko-KR')
      }
    ];
    saveQueueData(updatedData);
  };

  const updateQueue = (id, updatedItem) => {
    const updatedData = queueData.map(item =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    saveQueueData(updatedData);
  };

  const deleteQueue = (id) => {
    const updatedData = queueData.filter(item => item.id !== id);
    saveQueueData(updatedData);
  };

  const completeQueue = (id) => {
    updateQueue(id, {
      status: 'completed',
      completedAt: new Date().toLocaleString('ko-KR')
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏭 제조대기자 현황판 AI</h1>
        <div className="header-stats">
          <span>총 대기 건수: <strong>{queueData.length}</strong></span>
          {analysis && <span>평균 대기시간: <strong>{analysis.avgWaitTime}분</strong></span>}
        </div>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'board' ? 'active' : ''}`}
          onClick={() => setActiveTab('board')}
        >
          현황판
        </button>
        <button
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          대기자 추가
        </button>
        <button
          className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          AI 분석
        </button>
      </div>

      <main className="app-content">
        {activeTab === 'board' && (
          <QueueBoard
            queueData={queueData}
            onUpdateQueue={updateQueue}
            onDeleteQueue={deleteQueue}
            onCompleteQueue={completeQueue}
          />
        )}
        {activeTab === 'add' && (
          <AddQueue onAddQueue={addQueue} />
        )}
        {activeTab === 'analysis' && analysis && (
          <AIAnalysis analysis={analysis} queueData={queueData} />
        )}
      </main>
    </div>
  );
}

export default App;
