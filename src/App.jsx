import React, { useState, useEffect } from 'react';
import './App.css';
import AddWord from './components/AddWord';
import FlashcardQuiz from './components/FlashcardQuiz';
import WordList from './components/WordList';

function App() {
  const [words, setWords] = useState([]);
  const [activeTab, setActiveTab] = useState('quiz');

  useEffect(() => {
    const saved = localStorage.getItem('flashcard-words');
    if (saved) {
      setWords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flashcard-words', JSON.stringify(words));
  }, [words]);

  const addWord = (word, meaning) => {
    setWords([...words, { id: Date.now(), word, meaning }]);
  };

  const deleteWord = (id) => {
    setWords(words.filter(w => w.id !== id));
  };

  const editWord = (id, word, meaning) => {
    setWords(words.map(w => w.id === id ? { ...w, word, meaning } : w));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Flashcard 단어장</h1>
        <p className="header-sub">단어를 등록하고, 카드를 보며 뜻을 맞춰보세요!</p>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          퀴즈
        </button>
        <button
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          단어 추가
        </button>
        <button
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          단어 목록 ({words.length})
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'quiz' && (
          <FlashcardQuiz words={words} />
        )}
        {activeTab === 'add' && (
          <AddWord onAddWord={addWord} />
        )}
        {activeTab === 'list' && (
          <WordList words={words} onDelete={deleteWord} onEdit={editWord} />
        )}
      </main>
    </div>
  );
}

export default App;
