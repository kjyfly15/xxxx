import React, { useState } from 'react';

function WordList({ words, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editWord, setEditWord] = useState('');
  const [editMeaning, setEditMeaning] = useState('');

  if (words.length === 0) {
    return (
      <div className="empty-state">
        <h3>등록된 단어가 없습니다</h3>
        <p>"단어 추가" 탭에서 단어를 먼저 등록해주세요.</p>
      </div>
    );
  }

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditWord(item.word);
    setEditMeaning(item.meaning);
  };

  const saveEdit = () => {
    if (editWord.trim() && editMeaning.trim()) {
      onEdit(editingId, editWord.trim(), editMeaning.trim());
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="word-list">
      {words.map((item) => (
        <div key={item.id} className="word-item">
          {editingId === item.id ? (
            <>
              <div className="edit-inputs">
                <input
                  className="edit-input"
                  value={editWord}
                  onChange={(e) => setEditWord(e.target.value)}
                  placeholder="단어"
                />
                <input
                  className="edit-input"
                  value={editMeaning}
                  onChange={(e) => setEditMeaning(e.target.value)}
                  placeholder="뜻"
                />
              </div>
              <div className="word-item-actions">
                <button className="btn btn-primary btn-small" onClick={saveEdit}>
                  저장
                </button>
                <button className="btn btn-secondary btn-small" onClick={cancelEdit}>
                  취소
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="word-item-content">
                <div className="word-item-word">{item.word}</div>
                <div className="word-item-meaning">{item.meaning}</div>
              </div>
              <div className="word-item-actions">
                <button className="btn btn-secondary btn-small" onClick={() => startEdit(item)}>
                  수정
                </button>
                <button className="btn btn-danger btn-small" onClick={() => onDelete(item.id)}>
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default WordList;
