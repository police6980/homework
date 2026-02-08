import React, { useState, useEffect } from 'react';
import './Widgets.css';

const StickerBoard = ({ user, refreshTrigger }) => {
    const [stickers, setStickers] = useState(0);
    const [goal, setGoal] = useState('치킨');
    const [target, setTarget] = useState(20);

    // Admin Mode States
    const [isEditing, setIsEditing] = useState(false);
    const [tempGoal, setTempGoal] = useState('');
    const [tempTarget, setTempTarget] = useState(20);

    const fetchStickers = async () => {
        try {
            const res = await fetch(`/api/stickers/daughter`);
            const data = await res.json();
            setStickers(data.stickers);
            setGoal(data.reward_goal || '치킨');
            setTarget(data.sticker_target || 20);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStickers();
    }, [refreshTrigger]);

    const handleSaveSettings = async () => {
        try {
            await fetch(`/api/stickers/daughter/goal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal: tempGoal, target: parseInt(tempTarget) })
            });
            setGoal(tempGoal);
            setTarget(parseInt(tempTarget));
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleManualChange = async (delta) => {
        try {
            await fetch(`/api/stickers/daughter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ delta })
            });
            fetchStickers(); // Refresh
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = async () => {
        if (!window.confirm("정말 스티커를 0개로 초기화하시겠습니까?\n(보상을 주셨나요?)")) return;
        try {
            await fetch(`/api/stickers/daughter/reset`, {
                method: 'POST'
            });
            fetchStickers();
        } catch (err) {
            console.error(err);
        }
    };

    // Calculate progress
    const progress = Math.min(stickers, target);
    const isCompleted = stickers >= target;

    return (
        <div className="widget-card sticker-widget" style={{ background: 'linear-gradient(135deg, #fff9db 0%, #fff3bf 100%)', border: '2px solid #ffe066' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>🌟 칭찬 스티커판</h3>
                {user.role === 'mom' && (
                    <button
                        onClick={() => {
                            if (!isEditing) {
                                setTempGoal(goal);
                                setTempTarget(target);
                            }
                            setIsEditing(!isEditing);
                        }}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#f08c00' }}
                    >
                        {isEditing ? '취소' : '⚙️설정'}
                    </button>
                )}
            </div>

            {/* Admin Controls (Mom Only) */}
            {user.role === 'mom' && isEditing && (
                <div style={{ background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '8px', marginBottom: '10px', border: '1px solid #f08c00' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <label>목표: </label>
                        <input
                            type="text" value={tempGoal} onChange={(e) => setTempGoal(e.target.value)}
                            style={{ width: '100px', marginLeft: '5px', padding: '2px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '5px' }}>
                        <label>개수: </label>
                        <input
                            type="number" value={tempTarget} onChange={(e) => setTempTarget(e.target.value)}
                            style={{ width: '60px', marginLeft: '5px', padding: '2px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <button onClick={handleReset} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', padding: '3px 8px', fontSize: '0.8rem' }}>
                            🗑️ 초기화
                        </button>
                        <button onClick={handleSaveSettings} style={{ background: '#f08c00', color: 'white', border: 'none', borderRadius: '4px', padding: '3px 12px' }}>
                            저장
                        </button>
                    </div>
                </div>
            )}

            {/* Goal Display */}
            {!isEditing && (
                <div className="goal-section" style={{ textAlign: 'center', margin: '5px 0', fontSize: '1.1rem', color: '#e67700' }}>
                    목표: <strong>{goal}</strong>
                </div>
            )}

            {/* Grid */}
            <div className="sticker-grid" style={{
                gridTemplateColumns: `repeat(${target > 25 ? 10 : 5}, 1fr)`
            }}>
                {Array.from({ length: target }).map((_, i) => (
                    <div key={i} className={`sticker-slot ${i < progress ? 'filled' : ''}`}>
                        {i < progress ? '⭐' : (i + 1)}
                    </div>
                ))}
            </div>

            {/* Stats & Manual Control */}
            <div className="sticker-stats">
                {user.role === 'mom' ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <button onClick={() => handleManualChange(-1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{stickers} / {target}</span>
                        <button onClick={() => handleManualChange(1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', background: '#fab005', color: 'white', cursor: 'pointer' }}>+</button>
                    </div>
                ) : (
                    <p>현재 스티커: <strong>{stickers}</strong> / {target}</p>
                )}

                {isCompleted && (
                    <div className="coupon-alert">
                        🎉 축하합니다! <strong>{goal}</strong> 획득!
                    </div>
                )}
            </div>
            <style>{`
                .sticker-grid {
                    display: grid;
                    gap: 5px;
                    margin: 10px 0;
                }
                .sticker-slot {
                    aspect-ratio: 1;
                    background: rgba(255,255,255,0.5);
                    border-radius: 50%;
                    border: 1px dashed #fab005;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    color: #fab005;
                }
                .sticker-slot.filled {
                    background: white;
                    border: 2px solid #fab005;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    font-size: 1rem;
                    color: inherit;
                }
                .coupon-alert {
                    background: #ff6b6b;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    margin-top: 5px;
                    animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes pop {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default StickerBoard;
