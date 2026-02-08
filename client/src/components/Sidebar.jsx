import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { FaExclamationCircle } from 'react-icons/fa';

import StickerBoard from './StickerBoard';

const Sidebar = ({ currentUser, onSelectDate, refreshTrigger }) => {
    const [incompleteDates, setIncompleteDates] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, [currentUser, refreshTrigger]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            setIncompleteDates(data.dates || []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="sidebar-container">
            {/* 1. Sticker Board (Only for Daughter or Mom to see) */}
            <StickerBoard user={currentUser} refreshTrigger={refreshTrigger} />

            {/* 2. Notifications (Only if exists) */}
            {incompleteDates.length > 0 && (
                <div className="sidebar card warn-card">
                    <h3 className="sidebar-title">
                        <FaExclamationCircle className="warn-icon" />
                        알림
                    </h3>
                    <p className="sidebar-desc">
                        {incompleteDates.length}일치 숙제가 미완료 상태입니다!
                    </p>
                    <ul className="incomplete-list">
                        {incompleteDates.map(date => (
                            <li key={date} onClick={() => onSelectDate(date)}>
                                {date} 보러가기
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
