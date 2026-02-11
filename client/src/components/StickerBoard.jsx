import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './Widgets.css';

const StickerBoard = ({ user, refreshTrigger }) => {
    const [stats, setStats] = useState({ stickers: 0, reward_goal: '치킨', sticker_target: 20 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [editGoal, setEditGoal] = useState('');
    const [editTarget, setEditTarget] = useState(20);

    // Optimistic UI State
    const [optimisticStickers, setOptimisticStickers] = useState(null);

    const isMom = user.role === 'mom';

    const fetchStickers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/stickers/daughter`);
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setStats(data);
            setEditGoal(data.reward_goal);
            setEditTarget(data.sticker_target);
            setOptimisticStickers(null); // Sync complete, clear optimistic state
        } catch (err) {
            console.error(err);
            setError("데이터를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStickers();
    }, [refreshTrigger]);

    // Handle confetti when goal is reached
    useEffect(() => {
        const currentStickers = optimisticStickers !== null ? optimisticStickers : stats.stickers;
        if (currentStickers >= stats.sticker_target && stats.sticker_target > 0) {
            triggerConfetti();
        }
    }, [stats.stickers, optimisticStickers, stats.sticker_target]);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FF6B6B', '#FFD43B', '#69DB7C']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FF6B6B', '#FFD43B', '#69DB7C']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleUpdateStickers = async (delta) => {
        if (loading) return;

        // Optimistic Update
        const currentStickers = optimisticStickers !== null ? optimisticStickers : stats.stickers;
        const newStickers = Math.max(0, currentStickers + delta);
        setOptimisticStickers(newStickers);

        try {
            const res = await fetch(`/api/stickers/daughter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ delta })
            });

            if (!res.ok) throw new Error('Update failed');

            // Background refetch to ensure sync
            fetchStickers();
        } catch (err) {
            console.error(err);
            alert("스티커 업데이트 실패! 다시 시도해주세요.");
            setOptimisticStickers(null); // Revert on failure
            fetchStickers();
        }
    };

    const handleSaveConfig = async () => {
        if (!editGoal.trim() || editTarget < 1) {
            alert("목표와 개수를 올바르게 입력해주세요.");
            return;
        }

        try {
            const res = await fetch(`/api/stickers/daughter/goal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal: editGoal, target: parseInt(editTarget) })
            });

            if (res.ok) {
                setIsEditing(false);
                fetchStickers();
                alert("설정이 저장되었습니다!");
            }
        } catch (err) {
            console.error(err);
            alert("설정 저장 실패");
        }
    };

    const handleReset = async () => {
        if (!window.confirm("정말 스티커판을 초기화하시겠습니까? (이 작업은 되돌릴 수 없습니다)")) return;

        try {
            const res = await fetch(`/api/stickers/daughter/reset`, { method: 'POST' });
            if (res.ok) {
                fetchStickers();
                alert("스티커판이 초기화되었습니다.");
            }
        } catch (err) {
            console.error(err);
            alert("초기화 실패");
        }
    };

    // Render Logic
    const currentStickers = optimisticStickers !== null ? optimisticStickers : stats.stickers;
    const { reward_goal, sticker_target } = stats;
    const progress = Math.min(currentStickers, sticker_target);
    const isCompleted = currentStickers >= sticker_target;

    // Grid Calculation
    // We want a nice grid. If target is small (<=10), maybe 5 cols. If larger, maybe 5-8 cols.
    // Let's stick to a responsive grid using CSS Grid, but we need to know how many items to render.
    const gridItems = Array.from({ length: sticker_target });

    if (error) {
        return <div className="widget-card sticker-error">⚠️ {error} <button onClick={fetchStickers}>재시도</button></div>;
    }

    return (
        <div className={`widget-card sticker-board ${isCompleted ? 'completed' : ''}`}>
            {/* Header Area */}
            <div className="sticker-header">
                <div className="title-area">
                    <span className="icon">🍓</span>
                    <h3>칭찬 스티커판</h3>
                </div>
                {isMom && (
                    <button className="settings-btn" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? '닫기' : '⚙️ 설정'}
                    </button>
                )}
            </div>

            {/* Edit Mode Panel */}
            {isEditing && (
                <div className="edit-panel">
                    <h4>스티커판 설정</h4>
                    <div className="input-group">
                        <label>목표 보상:</label>
                        <input
                            type="text"
                            value={editGoal}
                            onChange={(e) => setEditGoal(e.target.value)}
                            placeholder="예: 치킨, 장난감"
                        />
                    </div>
                    <div className="input-group">
                        <label>목표 개수:</label>
                        <input
                            type="number"
                            value={editTarget}
                            onChange={(e) => setEditTarget(e.target.value)}
                            min="1"
                            max="100"
                        />
                    </div>
                    <div className="button-group">
                        <button className="btn-reset" onClick={handleReset}>🗑️ 초기화</button>
                        <button className="btn-save" onClick={handleSaveConfig}>💾 저장</button>
                    </div>
                </div>
            )}

            {/* Goal Display */}
            <div className="goal-display">
                <span className="label">이번 목표</span>
                <span className="target">{reward_goal}</span>
                <div className="progress-text">
                    <span className="current">{currentStickers}</span>
                    <span className="divider">/</span>
                    <span className="total">{sticker_target}</span>
                </div>
            </div>

            {/* Sticker Grid */}
            <div className="sticker-grid-container">
                <div className="sticker-grid" style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(40px, 1fr))`
                }}>
                    {gridItems.map((_, i) => (
                        <div key={i} className={`sticker-slot ${i < progress ? 'filled' : 'empty'}`}>
                            {i < progress ? (
                                <div className="sticker-content bounce-in">🍓</div>
                            ) : (
                                <div className="sticker-number">{i + 1}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons (Mom Only) */}
            {isMom && (
                <div className="control-panel">
                    <button
                        className="btn-control minus"
                        onClick={() => handleUpdateStickers(-1)}
                        disabled={currentStickers <= 0}
                    >
                        -1
                    </button>
                    <span className="control-label">스티커 주기</span>
                    <button
                        className="btn-control plus"
                        onClick={() => handleUpdateStickers(1)}
                        disabled={isCompleted}
                    >
                        +1
                    </button>
                </div>
            )}

            {/* Completion Message */}
            {isCompleted && (
                <div className="completion-banner">
                    <h4>🎉 목표 달성! 축하해요! 🎉</h4>
                    <p>{reward_goal}을(를) 선물로 받으세요!</p>
                </div>
            )}
        </div>
    );
};

export default StickerBoard;
