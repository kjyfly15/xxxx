import React, { useState } from 'react';
import './AddQueue.css';

function AddQueue({ onAddQueue }) {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: 1,
    workType: 'assembly',
    priority: 'normal',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      alert('제품명을 입력해주세요.');
      return;
    }

    onAddQueue(formData);
    setSubmitted(true);

    // 초기화
    setTimeout(() => {
      setFormData({
        productName: '',
        quantity: 1,
        workType: 'assembly',
        priority: 'normal',
        notes: ''
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="add-queue">
      <div className="form-container">
        <h2 className="form-title">새로운 대기자 추가</h2>

        {submitted && (
          <div className="alert alert-success">
            ✓ 대기자가 추가되었습니다!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">제품명 *</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="예: 프로펠러 부품"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">수량</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="workType">작업 유형</label>
              <select
                id="workType"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
              >
                <option value="assembly">조립</option>
                <option value="machining">기계 가공</option>
                <option value="quality">품질 검사</option>
                <option value="packaging">포장</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priority">우선순위</label>
            <div className="priority-selector">
              <label className="radio-option">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={handleChange}
                />
                <span className="radio-label">낮음</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="priority"
                  value="normal"
                  checked={formData.priority === 'normal'}
                  onChange={handleChange}
                />
                <span className="radio-label">중간</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={handleChange}
                />
                <span className="radio-label">높음</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">메모</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="추가 정보나 특수 요청사항을 입력해주세요."
              rows="4"
            />
          </div>

          <button type="submit" className="btn-submit">
            대기자 추가
          </button>
        </form>
      </div>

      <div className="info-panel">
        <h3>📋 입력 가이드</h3>
        <ul>
          <li><strong>제품명:</strong> 제조할 제품의 이름</li>
          <li><strong>수량:</strong> 제조해야 할 수량</li>
          <li><strong>작업 유형:</strong> 수행해야 할 작업의 종류</li>
          <li><strong>우선순위:</strong> 작업의 긴급도</li>
          <li><strong>메모:</strong> 특수 요구사항이나 참고사항</li>
        </ul>
      </div>
    </div>
  );
}

export default AddQueue;
