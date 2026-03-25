import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './AIAnalysis.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function AIAnalysis({ analysis, queueData }) {
  if (!analysis) {
    return <div className="ai-analysis"><p>분석 데이터가 없습니다.</p></div>;
  }

  // 작업 유형별 분포 차트
  const workTypeChartData = {
    labels: Object.keys(analysis.workTypeDistribution || {}),
    datasets: [
      {
        label: '작업 건수',
        data: Object.values(analysis.workTypeDistribution || {}),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#4facfe',
          '#00f2fe'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  // 우선순위별 분포 차트
  const priorityChartData = {
    labels: ['높음', '중간', '낮음'],
    datasets: [
      {
        label: '우선순위별 건수',
        data: [
          queueData.filter(q => q.priority === 'high').length,
          queueData.filter(q => q.priority === 'normal').length,
          queueData.filter(q => q.priority === 'low').length
        ],
        backgroundColor: [
          '#ff6b6b',
          '#ffd93d',
          '#6bcf7f'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  // 상태별 분포 차트
  const statusChartData = {
    labels: ['대기 중', '처리 중', '완료'],
    datasets: [
      {
        label: '상태별 건수',
        data: [
          queueData.filter(q => q.status === 'waiting').length,
          queueData.filter(q => q.status === 'processing').length,
          queueData.filter(q => q.status === 'completed').length
        ],
        backgroundColor: [
          '#e3f2fd',
          '#fff3e0',
          '#e8f5e9'
        ],
        borderColor: ['#2196f3', '#ff9800', '#4caf50'],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="ai-analysis">
      <div className="analysis-header">
        <h2>🤖 AI 분석 및 인사이트</h2>
        <p>현재 제조 대기열의 상황을 분석한 결과입니다.</p>
      </div>

      {/* 핵심 지표 */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">총 대기 건수</div>
          <div className="metric-value">{analysis.totalItems}</div>
          <div className="metric-subtext">개</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">평균 대기시간</div>
          <div className="metric-value">{analysis.avgWaitTime}</div>
          <div className="metric-subtext">분</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">예상 완료시간</div>
          <div className="metric-value">{Math.round(analysis.estimatedCompletionTime / 60)}</div>
          <div className="metric-subtext">시간</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">높음 우선순위</div>
          <div className="metric-value priority-high-text">{analysis.highPriorityCount}</div>
          <div className="metric-subtext">건</div>
        </div>
      </div>

      {/* 권장사항 */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="recommendations">
          <h3>💡 AI 권장사항</h3>
          <div className="recommendation-list">
            {analysis.recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-item">
                <span className="recommendation-icon">→</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 병목 분석 */}
      {analysis.bottlenecks && analysis.bottlenecks.length > 0 && (
        <div className="bottlenecks">
          <h3>⚠️ 병목 지점 분석</h3>
          <div className="bottleneck-list">
            {analysis.bottlenecks.map((bn, idx) => (
              <div key={idx} className="bottleneck-item">
                <span className="bottleneck-icon">🔴</span>
                <span>{bn}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 차트 */}
      <div className="charts-grid">
        <div className="chart-container">
          <h3>작업 유형별 분포</h3>
          {Object.keys(analysis.workTypeDistribution || {}).length > 0 ? (
            <Pie data={workTypeChartData} options={chartOptions} />
          ) : (
            <p className="no-data">데이터가 없습니다.</p>
          )}
        </div>

        <div className="chart-container">
          <h3>우선순위별 분포</h3>
          <Pie data={priorityChartData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>상태별 분포</h3>
          <Pie data={statusChartData} options={chartOptions} />
        </div>
      </div>

      {/* AI 최적화 제안 */}
      <div className="optimization-panel">
        <h3>🎯 최적화 전략</h3>
        <div className="optimization-content">
          <div className="optimization-item">
            <span className="step-number">1</span>
            <div>
              <h4>우선순위 조정</h4>
              <p>높은 우선순위 작업을 먼저 처리하여 병목 현상을 줄일 수 있습니다.</p>
            </div>
          </div>

          <div className="optimization-item">
            <span className="step-number">2</span>
            <div>
              <h4>병렬 처리 증대</h4>
              <p>병목 작업 유형에 추가 자원을 할당하면 처리 시간을 단축할 수 있습니다.</p>
            </div>
          </div>

          <div className="optimization-item">
            <span className="step-number">3</span>
            <div>
              <h4>인력 재배치</h4>
              <p>작업 부하에 따라 인력을 재배치하여 효율성을 높일 수 있습니다.</p>
            </div>
          </div>

          <div className="optimization-item">
            <span className="step-number">4</span>
            <div>
              <h4>일정 계획</h4>
              <p>예상 완료 시간을 고려하여 향후 일정을 계획하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAnalysis;
