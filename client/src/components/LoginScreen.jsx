import React, { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleDaughterLogin = () => {
        onLogin({ name: 'Park Gyuri', role: 'daughter' });
    };

    const handleMomClick = () => {
        setShowPassword(true);
        setError('');
        setPassword('');
    };

    const handleMomSubmit = (e) => {
        e.preventDefault();
        if (password === '137979') {
            onLogin({ name: 'Mom', role: 'mom' });
        } else {
            setError('비밀번호가 틀렸습니다.');
        }
    };

    return (
        <div className="login-container">
            <div className="card login-card">
                <div className="login-header">
                    <span className="login-icon">📚</span>
                    <h1>숙제 관리 앱</h1>
                    <p>누가 로그인하나요?</p>
                </div>

                {!showPassword ? (
                    <div className="user-selection">
                        <button className="user-btn daughter" onClick={handleDaughterLogin}>
                            <span className="emoji">👧</span>
                            <span className="label">박규리</span>
                        </button>
                        <button className="user-btn mom" onClick={handleMomClick}>
                            <span className="emoji">👩</span>
                            <span className="label">엄마</span>
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleMomSubmit} className="password-form">
                        <label>비밀번호 입력:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            maxLength={6}
                            placeholder="6자리 숫자"
                        />
                        {error && <p className="error-msg">{error}</p>}
                        <div className="form-actions">
                            <button type="button" onClick={() => setShowPassword(false)} className="btn-back">취소</button>
                            <button type="submit" className="btn-primary">로그인</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginScreen;
