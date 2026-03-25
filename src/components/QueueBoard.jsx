import React, { useState } from 'react';
import './QueueBoard.css';

function QueueBoard({ queueData, onUpdateQueue, onDeleteQueue, onCompleteQueue }) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredData = queueData.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 1, normal: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'waitTime') {
      return (b.waitTime || 0) - (a.waitTime || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const updateWaitTime = (id) => {
    const item = queueData.find(q => q.id === id);
    if (item) {
      onUpdateQueue(id, { waitTime: (item.waitTime || 0) + 1 });
    }
  };

  return (
    <div className="queue-board">
      <div className="board-controls">
        <div className="control-group">
          <label>정렬:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">등록 시간순</option>
            <option value="priority">우선순위</option>
            <option value="waitTime">대기시간</option>
          </select>
        </div>

        <div className="control-group">
          <label>상태 필터:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">전체</option>
            <option value="waiting">대기 중</option>
            <option value="processing">처리 중</option>
            <option value="completed">완료</option>
          </select>
        </div>

        <div className="status-count">
          <span>대기 중: {queueData.filter(q => q.status === 'waiting').length}</span>
          <span>처리 중: {queueData.filter(q => q.status === 'processing').length}</span>
          <span>완료: {queueData.filter(q => q.status === 'completed').length}</span>
        </div>
      </div>

      {sortedData.length === 0 ? (
        <div className="empty-state">
          <p>📭 대기자가 없습니다.</p>
        </div>
      ) : (
        <div className="queue-table">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제품명</th>
                <th>수량</th>
                <th>작업유형</th>
                <th>우선순위</th>
                <th>상태</th>
                <th>대기시간(분)</th>
                <th>등록시간</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={item.id} className={`row-${item.status}`}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.workType}</td>
                  <td>
                    <span className={`priority-badge priority-${item.priority}`}>
                      {item.priority === 'high' ? '높음' : item.priority === 'normal' ? '중간' : '낮음'}
                    </span>
                  </td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateQueue(item.id, { status: e.target.value })}
                      className="status-select"
                    >
                      <option value="waiting">대기 중</option>
                      <option value="processing">처리 중</option>
                      <option value="completed">완료</option>
                    </select>
                  </td>
                  <td>
                    <div className="wait-time-control">
                      <span>{item.waitTime || 0}</span>
                      <button
                        className="btn-increment"
                        onClick={() => updateWaitTime(item.id)}
                        title="대기시간 증가"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="small-text">{item.createdAt}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-complete"
                        onClick={() => onCompleteQueue(item.id)}
                        disabled={item.status === 'completed'}
                        title="완료 처리"
                      >
                        ✓
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onDeleteQueue(item.id)}
                        title="삭제"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default QueueBoard;
