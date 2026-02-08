import React, { useState, useEffect } from 'react';
import './TaskList.css';
import { FaTrash, FaCheck, FaPlus, FaSchool, FaCalculator, FaLanguage, FaPenFancy, FaEllipsisH } from 'react-icons/fa';
import QuoteWidget from './QuoteWidget';
import PhotoWidget from './PhotoWidget';
import MemoWidget from './MemoWidget';
import confetti from 'canvas-confetti';

const CATEGORIES = [
    { id: 'School', label: '학교숙제', icon: <FaSchool /> },
    { id: 'Math', label: '수학숙제', icon: <FaCalculator /> },
    { id: 'English', label: '영어숙제', icon: <FaLanguage /> },
    { id: 'Kumon', label: '구몬숙제', icon: <FaPenFancy /> },
    { id: 'Other', label: '기타숙제', icon: <FaEllipsisH /> }
];

const TaskList = ({ user, date, onUpdate, refreshTrigger, onRefresh }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
    const [filter, setFilter] = useState('ALL'); // ALL, COMPLETED, INCOMPLETE

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [date, refreshTrigger]);

    const fetchTasks = async () => {
        setIsLoading(true);
        // Minimum loading time for visual effect (500ms)
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));

        try {
            const [res] = await Promise.all([
                fetch(`/api/tasks?date=${date}`),
                minLoadTime
            ]);

            const data = await res.json();
            if (data.message === 'success') {
                const sorted = data.data.sort((a, b) => a.id - b.id);
                setTasks(sorted);
                onUpdate(sorted);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTask, category: selectedCategory, date })
            });
            const data = await res.json();
            if (data.message === 'success') {
                const updated = [...tasks, data.data];
                setTasks(updated);
                onUpdate(updated);
                setNewTask('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const toggleTask = async (task) => {
        const updatedStatus = task.completed ? 0 : 1;
        const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, completed: updatedStatus } : t);
        setTasks(updatedTasks);
        onUpdate(updatedTasks);

        // Fun Feature: Confetti if all tasks completed!
        if (updatedStatus === 1) {
            const allComplete = updatedTasks.every(t => t.completed);
            if (allComplete && updatedTasks.length > 0) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff6b6b', '#fcc2d7', '#d0bfff', '#99e9f2', '#b2f2bb']
                });
            }

            // Fun Feature: Increment Sticker for Daughter
            if (user.role === 'daughter') {
                try {
                    await fetch(`/api/stickers/${user.username}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ delta: 1 })
                    });
                    // Trigger app-wide refresh if needed, but sidebar updates via app state
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            // Decrement sticker if unchecked? (Optional, let's keep it generous for now or strict?)
            // Let's decrement to prevent spamming
            if (user.role === 'daughter') {
                try {
                    await fetch(`/api/stickers/${user.username}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ delta: -1 })
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        }

        try {
            await fetch(`/api/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: updatedStatus })
            });
        } catch (err) {
            console.error(err);
            fetchTasks();
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });
            const filtered = tasks.filter(t => t.id !== id);
            setTasks(filtered);
            onUpdate(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    const getCategoryLabel = (catId) => {
        const cat = CATEGORIES.find(c => c.id === catId);
        return cat ? cat.label : catId;
    };

    const getCategoryIcon = (catId) => {
        const cat = CATEGORIES.find(c => c.id === catId);
        return cat ? cat.icon : <FaEllipsisH />;
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'COMPLETED') return t.completed;
        if (filter === 'INCOMPLETE') return !t.completed;
        return true;
    });

    return (
        <div className="task-list-container">
            {/* Mom's Memo Widget (Start of List) */}
            <MemoWidget user={user} refreshTrigger={refreshTrigger} />

            {/* Add Task Form - Only for Mom */}
            {user.role === 'mom' && (
                <div className="add-task-bar">
                    <form onSubmit={handleAddTask} className="horizontal-form">
                        <input
                            type="text"
                            placeholder="할 일을 입력하세요..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="task-input"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="cat-select"
                        >
                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                        <button type="submit" className="btn-primary">추가</button>
                    </form>
                </div>
            )}



            {/* Filters */}
            <div className="filter-tabs">
                <button className={`tab ${filter === 'ALL' ? 'active' : ''}`} onClick={() => setFilter('ALL')}>전체</button>
                <button className={`tab ${filter === 'INCOMPLETE' ? 'active' : ''}`} onClick={() => setFilter('INCOMPLETE')}>진행 중</button>
                <button className={`tab ${filter === 'COMPLETED' ? 'active' : ''}`} onClick={() => setFilter('COMPLETED')}>완료됨</button>
            </div>

            {/* Task List */}
            <div className="tasks-grid">
                {filteredTasks.length === 0 && <div className="empty-state">할 일이 없습니다! 휴식 시간인가요? 🏖️</div>}
                {filteredTasks.map(task => (
                    <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                        <div
                            className={`task-left ${user.role === 'mom' ? 'read-only' : ''}`}
                            onClick={() => user.role !== 'mom' && toggleTask(task)}
                            style={{ cursor: user.role === 'mom' ? 'default' : 'pointer' }}
                        >
                            <div className={`custom-checkbox ${task.completed ? 'checked' : ''} ${user.role === 'mom' ? 'disabled' : ''}`}>
                                {task.completed && <FaCheck />}
                            </div>
                            <div className="task-info">
                                <span className="task-title">{task.title}</span>
                                <div className="task-meta">
                                    <span className="task-cat-badge">
                                        {getCategoryIcon(task.category)} {getCategoryLabel(task.category)}
                                    </span>
                                    {/* Show completion time for Mom */}
                                    {user.role === 'mom' && task.completed && task.completed_at && (
                                        <span className="task-time-badge">
                                            ⏰ {task.completed_at} 완료
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {user.role === 'mom' && (
                            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>
                                <FaTrash />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {/* Fun Widgets for Daughter */}
            {user.role === 'daughter' && (
                <div className="widgets-container" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                    marginTop: '30px',
                    paddingBottom: '20px'
                }}>
                    <QuoteWidget />
                    <PhotoWidget />
                </div>
            )}
            {/* Loading Overlay */}
            {isLoading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    zIndex: 9999
                }}>
                    <div style={{ fontSize: '3rem', animation: 'spin 1s infinite linear' }}>🔄</div>
                    <div style={{ marginTop: '20px', fontSize: '1.5rem', fontWeight: 'bold', color: '#555' }}>새로고침 중...</div>
                    <style>{`
                        @keyframes spin { 100% { transform: rotate(360deg); } }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default TaskList;
