import React from 'react';
import './ProgressBar.css';
import { FaChartBar } from 'react-icons/fa';

const ProgressBar = ({ tasks }) => {
    const total = tasks.length;
    // If no tasks, show 0% or maybe just empty state? 
    // Let's show 100% if no tasks? No, 0% is better logically unless we want to encourage rest.
    // Let's stick to simple math.

    const completed = tasks.filter(t => t.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="progress-card">
            <div className="progress-header">
                <div className="progress-title">
                    <FaChartBar className="chart-icon" /> 전체 진행률
                </div>
                <div className="progress-percentage">
                    완료: {completed}/{total} ({percentage}%)
                </div>
            </div>

            <div className="progress-track-large">
                <div
                    className="progress-fill-large"
                    style={{ width: `${percentage}%` }}
                >
                    <span className="progress-text-overlay">{percentage}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
