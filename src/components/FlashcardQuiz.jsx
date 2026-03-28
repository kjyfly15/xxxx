import React, { useState, useEffect, useCallback } from 'react';

function FlashcardQuiz({ words }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [shuffledWords, setShuffledWords] = useState([]);

  const shuffle = useCallback(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setAnswer('');
    setResult(null);
    setScore({ correct: 0, wrong: 0 });
  }, [words]);

  useEffect(() => {
    setShuffledWords([...words]);
    setCurrentIndex(0);
    setAnswer('');
    setResult(null);
  }, [words]);

  if (words.length === 0) {
    return (
      <div className="empty-state">
        <h3>등록된 단어가 없습니다</h3>
        <p>"단어 추가" 탭에서 단어를 먼저 등록해주세요.</p>
      </div>
    );
  }

  const currentWord = shuffledWords[currentIndex] || words[currentIndex];
  if (!currentWord) return null;

  const checkAnswer = () => {
    if (!answer.trim()) return;

    const isCorrect = answer.trim().toLowerCase() === currentWord.meaning.toLowerCase();
    setResult(isCorrect ? 'correct' : 'wrong');
    setCorrectAnswer(currentWord.meaning);

    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (result) {
        goNext();
      } else {
        checkAnswer();
      }
    }
  };

  const goNext = () => {
    const list = shuffledWords.length > 0 ? shuffledWords : words;
    if (currentIndex < list.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setAnswer('');
    setResult(null);
    setCorrectAnswer('');
  };

  const goPrev = () => {
    const list = shuffledWords.length > 0 ? shuffledWords : words;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(list.length - 1);
    }
    setAnswer('');
    setResult(null);
    setCorrectAnswer('');
  };

  const total = shuffledWords.length || words.length;

  return (
    <div className="flashcard-container">
      <div className="score-bar">
        <span>O {score.correct}</span>
        <span>X {score.wrong}</span>
      </div>

      <div className="quiz-controls">
        <button className="btn btn-secondary btn-small" onClick={shuffle}>
          섞기
        </button>
      </div>

      <div className="flashcard">
        <div className="flashcard-number">
          {currentIndex + 1} / {total}
        </div>
        <div className="flashcard-word">{currentWord.word}</div>
        <div className="flashcard-hint">이 단어의 뜻은?</div>
      </div>

      {result && (
        <div className={`result-message ${result === 'correct' ? 'result-correct' : 'result-wrong'}`}>
          {result === 'correct'
            ? '정답입니다!'
            : `오답! 정답: ${correctAnswer}`}
        </div>
      )}

      <div className="answer-section">
        <input
          className={`answer-input ${result === 'correct' ? 'correct' : result === 'wrong' ? 'wrong' : ''}`}
          type="text"
          placeholder="뜻을 입력하세요"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={result !== null}
          autoFocus
        />
        {!result ? (
          <button className="btn btn-primary" onClick={checkAnswer}>
            확인
          </button>
        ) : (
          <button className="btn btn-primary" onClick={goNext}>
            다음
          </button>
        )}
      </div>

      <div className="card-nav">
        <button className="btn btn-secondary btn-small" onClick={goPrev}>
          이전
        </button>
        <button className="btn btn-secondary btn-small" onClick={goNext}>
          다음
        </button>
      </div>
    </div>
  );
}

export default FlashcardQuiz;
