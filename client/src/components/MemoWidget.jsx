import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaTrash, FaPaperPlane } from 'react-icons/fa';
import './Widgets.css';

const MemoWidget = ({ user, refreshTrigger }) => {
    const [memos, setMemos] = useState([]);
    const [newMemo, setNewMemo] = useState('');

    useEffect(() => {
        fetchMemos();
    }, [refreshTrigger]);

    const fetchMemos = async () => {
        try {
            const res = await fetch('/api/memos');
            const data = await res.json();
            setMemos(data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!newMemo.trim()) return;

        try {
            const res = await fetch('/api/memos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMemo })
            });
            const data = await res.json();
            if (data.message === 'success') {
                setMemos([data.data, ...memos]);
                setNewMemo('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (user.role !== 'mom') return;
        if (!window.confirm('삭제하시겠습니까?')) return;
        try {
            await fetch(`/api/memos/${id}`, { method: 'DELETE' });
            setMemos(memos.filter(m => m.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="memo-widget" style={{
            background: '#fff3cd',
            borderRadius: '20px', // Soft rounded container
            padding: '20px',
            marginBottom: '20px',
            border: '2px solid #ffeeba',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#856404', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💌 엄마의 쪽지함
            </h3>

            {/* Input Form for Mom */}
            {user.role === 'mom' && (
                <form onSubmit={handleSave} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={newMemo}
                        onChange={(e) => setNewMemo(e.target.value)}
                        placeholder="이곳에 응원 메시지를 적어주세요..."
                        style={{
                            flex: 1,
                            border: '2px solid #ffeeba',
                            borderRadius: '12px', // Soft square input
                            padding: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            background: 'white'
                        }}
                    />
                    <button type="submit" style={{
                        border: 'none', background: '#fab005', color: 'white',
                        borderRadius: '12px', padding: '0 20px', cursor: 'pointer',
                        fontSize: '1.2rem', display: 'flex', alignItems: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <FaPaperPlane />
                    </button>
                </form>
            )}

            {/* List of Memos */}
            <div className="memo-list" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
                {memos.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#adb5bd', fontSize: '0.95rem' }}>
                        {user.role === 'mom' ? '따님에게 첫 번째 쪽지를 남겨보세요! 🥰' : '아직 도착한 쪽지가 없어요!'}
                    </div>
                )}
                {memos.map(memo => (
                    <div key={memo.id} style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '16px', // Soft square shape
                        marginBottom: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        position: 'relative',
                        border: '1px solid #f8f9fa'
                    }}>
                        <div style={{
                            color: '#495057',
                            fontSize: '1.05rem',
                            lineHeight: '1.5',
                            marginBottom: '8px',
                            whiteSpace: 'pre-wrap',
                            paddingRight: '20px'
                        }}>
                            {memo.content}
                        </div>

                        <div style={{
                            fontSize: '0.8rem',
                            color: '#868e96',
                            textAlign: 'right',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            🕒 {memo.created_at ? format(parseISO(memo.created_at), 'a h:mm', { locale: ko }) : '방금 전'}
                        </div>

                        {user.role === 'mom' && (
                            <button
                                onClick={() => handleDelete(memo.id)}
                                style={{
                                    position: 'absolute', top: '10px', right: '10px',
                                    border: 'none', background: 'none', color: '#dee2e6',
                                    cursor: 'pointer', padding: '5px', transition: 'color 0.2s'
                                }}
                                className="memo-delete-btn"
                            >
                                <FaTrash size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <style>{`
                .memo-delete-btn:hover { color: #fa5252 !important; }
                /* Custom Scrollbar */
                .memo-list::-webkit-scrollbar { width: 6px; }
                .memo-list::-webkit-scrollbar-track { background: transparent; }
                .memo-list::-webkit-scrollbar-thumb { background: #ffeeba; border-radius: 10px; }
                .memo-list::-webkit-scrollbar-thumb:hover { background: #fab005; }
            `}</style>
        </div>
    );
};

export default MemoWidget;
