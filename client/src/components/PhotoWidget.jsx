import React, { useState, useEffect } from 'react';
import './Widgets.css';

// Using local images (Placeholders or User-provided)
// The user can replace '1.jpg' in 'client/public/ive' with real photos!
const PHOTOS = Array.from({ length: 17 }, (_, i) => `/ive/${i + 1}.jpg`);

// Note: This ensures offline support and allows user customization.

const PhotoWidget = () => {
    const [photoUrl, setPhotoUrl] = useState('');

    const pickRandomPhoto = () => {
        const randomIndex = Math.floor(Math.random() * PHOTOS.length);
        setPhotoUrl(PHOTOS[randomIndex]);
    };

    useEffect(() => {
        pickRandomPhoto();
    }, []);

    return (
        <div className="widget-card photo-widget">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3>💖 Cheer Up!</h3>
                <button onClick={pickRandomPhoto} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }} title="다른 사진 보기">
                    🎲
                </button>
            </div>
            <div className="photo-container">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt="IVE Member"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML += '<p style="color:#ff6b6b; font-size:0.9rem; padding:20px;">Image failed to load.<br/>Make sure 1.jpg~17.jpg exist in client/public/ive</p>';
                        }}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default PhotoWidget;
