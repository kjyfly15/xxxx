import React, { useState } from 'react';

function AddWord({ onAddWord }) {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) return;

    onAddWord(word.trim(), meaning.trim());
    setWord('');
    setMeaning('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="card">
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>단어</label>
          <input
            className="form-input"
            type="text"
            placeholder="예: apple"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>뜻</label>
          <input
            className="form-input"
            type="text"
            placeholder="예: 사과"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            단어 추가
          </button>
        </div>
        {showSuccess && (
          <p className="success-message">단어가 추가되었습니다!</p>
        )}
      </form>
    </div>
  );
}

export default AddWord;
