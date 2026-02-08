import React, { useState, useEffect } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import './Widgets.css';

const DDayWidget = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newEventTitle, target_date: newEventDate })
            });
            setNewEventTitle('');
            setNewEventDate('');
            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm('삭제하시겠습니까?')) return;
        try {
            await fetch(`/api/events/${id}`, { method: 'DELETE' });
            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    if (events.length === 0 && user.role !== 'mom') return null;

    return (
        <div className="dday-widget" style={{ marginBottom: '20px' }}>
            {events.map(event => {
                const today = new Date();
                const target = parseISO(event.target_date);
                const diff = differenceInDays(target, today);
                let dDayStr = diff > 0 ? `D-${diff}` : (diff === 0 ? 'D-Day' : `D+${Math.abs(diff)}`);

                return (
                    <div key={event.id} style={{
                        background: 'white', borderRadius: '8px', padding: '10px',
                        marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <div>
                            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{event.title}</span>
                            <span style={{ color: '#fa5252', fontWeight: 'bold' }}>{dDayStr}</span>
                        </div>
                        {user.role === 'mom' && (
                            <button onClick={() => handleDeleteEvent(event.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc' }}>×</button>
                        )}
                    </div>
                );
            })}

            {user.role === 'mom' && (
                <form onSubmit={handleAddEvent} style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                    <input
                        type="text" placeholder="일정 이름 (예: 여름방학)"
                        value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)}
                        style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    <input
                        type="date"
                        value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)}
                        style={{ width: '110px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                        required
                    />
                    <button type="submit" style={{ background: '#22b8cf', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                </form>
            )}
        </div>
    );
};

export default DDayWidget;
