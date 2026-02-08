# Homework App Codebase Summary


## File: client\.gitignore
```txt
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

## File: client\eslint.config.js
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])

```

## File: client\vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
})

```

## File: client\README.md
```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```

## File: client\index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>client</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## File: client\src\main.jsx
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

## File: client\src\index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

:root {
  --primary: #6C5DD3;
  /* Soft Purple */
  --secondary: #00B87C;
  /* Bright Green for progress */
  --accent: #FFCE73;
  /* Yellow/Orange */
  --text: #1B1B1B;
  --text-light: #A0A0A0;
  --bg: #F5F6FA;
  --white: #FFFFFF;
  --card-shadow: 0 8px 24px rgba(108, 93, 211, 0.05);
  /* Soft purple shadow */
  --radius: 20px;
  --font-main: 'Noto Sans KR', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

#root {
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.96);
}

input,
select,
textarea {
  font-family: inherit;
  outline: none;
}

.container {
  width: 100%;
  max-width: 900px;
  /* Slightly wider for new layout */
  margin: 0 auto;
  padding: 24px;
}

.card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  /* Subtle border */
}

.btn-primary {
  background-color: var(--primary);
  color: var(--white);
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(108, 93, 211, 0.3);
}

.btn-primary:hover {
  background-color: #5A4Cb5;
  transform: translateY(-2px);
}
```

## File: client\src\App.css
```css
.app-layout {
  min-height: 100vh;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
}

.app-header {
  background: var(--white);
  padding: 16px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Header Flex Layout */
.header-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 0;
}

@media (min-width: 768px) {
  .header-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 2rem;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
}

.user-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.user-badge.daughter {
  background-color: var(--accent);
  color: #7A5C00;
}

.user-badge.mom {
  background-color: var(--primary);
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-picker-wrapper {
  display: none;
  /* Hide header date on mobile */
}

@media (min-width: 768px) {
  .date-picker-wrapper {
    display: block;
  }
}

.date-display-btn {
  background: #F0F0F0;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.date-display-btn:hover {
  background: #e0e0e0;
  color: var(--primary);
  border-color: rgba(108, 93, 211, 0.2);
}

.calendar-icon {
  color: var(--primary);
}

.icon-btn-round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--white);
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1rem;
}

.icon-btn-round:hover {
  background: #f9f9f9;
  color: var(--primary);
}

.logout-btn {
  background: transparent;
  color: #999;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.logout-btn:hover {
  color: var(--text);
}

/* Main Content Grid */
.main-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding-top: 30px;
  flex: 1;
}

@media (min-width: 900px) {
  .main-content {
    grid-template-columns: 3fr 1fr;
    align-items: start;
  }

  .sidebar-area {
    position: sticky;
    top: 100px;
  }
}

.date-nav-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  background: var(--white);
  padding: 12px;
  border-radius: var(--radius);
  box-shadow: var(--card-shadow);
}

.current-date-label-wrapper .date-display-btn {
  background: transparent;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  padding: 4px 8px;
}

.current-date-label-wrapper .date-display-btn:hover {
  background: #F5F6FA;
}

.nav-btn {
  background: var(--bg);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.nav-btn:hover {
  background: #e0e0e0;
}
```

## File: client\src\components\ProgressBar.jsx
```jsx
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

```

## File: client\src\components\ProgressBar.css
```css
.progress-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--card-shadow);
    margin-bottom: 32px;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.progress-title {
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text);
}

.chart-icon {
    color: #6C5DD3;
    /* Purple Icon */
}

.progress-percentage {
    font-size: 0.9rem;
    color: var(--primary);
    background: #F0F0FF;
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 600;
}

.progress-track-large {
    width: 100%;
    height: 32px;
    background: #E4E4E4;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
}

.progress-fill-large {
    height: 100%;
    background: #00B87C;
    /* Bright Green */
    border-radius: 16px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 12px;
}

.progress-text-overlay {
    color: #fff;
    font-weight: 700;
    font-size: 0.9rem;
}
```

## File: client\src\components\Sidebar.css
```css
.sidebar {
    background: #FFF5F5;
    border: 1px solid #FFEDED;
}

.sidebar-title {
    display: flex;
    align-items: center;
    color: #FF4D4F;
    margin-bottom: 12px;
    font-size: 1.1rem;
    font-weight: 700;
}

.warn-icon {
    margin-right: 8px;
}

.sidebar-desc {
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 16px;
}

.incomplete-list {
    list-style: none;
    padding: 0;
}

.incomplete-list li {
    background: #fff;
    padding: 10px 14px;
    margin-bottom: 8px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    color: #FF4D4F;
    box-shadow: 0 2px 4px rgba(255, 77, 79, 0.1);
    transition: all 0.2s;
    border: 1px solid transparent;
}

.incomplete-list li:hover {
    background: #FF4D4F;
    color: #fff;
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(255, 77, 79, 0.2);
}
```

## File: client\src\components\LoginScreen.jsx
```jsx
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

```

## File: client\src\components\LoginScreen.css
```css
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #F5F6FA;
}

.login-card {
    text-align: center;
    width: 90%;
    max-width: 420px;
    padding: 48px 32px;
    box-shadow: 0 10px 30px rgba(108, 93, 211, 0.1);
}

.login-header h1 {
    font-size: 1.8rem;
    margin: 10px 0 5px;
    color: var(--text);
}

.login-header p {
    color: #888;
    margin-bottom: 32px;
}

.login-icon {
    font-size: 3rem;
}

.user-selection {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.user-btn {
    display: flex;
    align-items: center;
    padding: 20px;
    font-size: 1.2rem;
    border-radius: 20px;
    border: 2px solid transparent;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    font-weight: 700;
    color: var(--text);
    transition: all 0.2s;
}

.user-btn .emoji {
    font-size: 1.5rem;
    margin-right: 16px;
    background: #F0F0F0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(108, 93, 211, 0.15);
}

.user-btn.daughter:hover {
    border-color: #FFCE73;
}

.user-btn.mom:hover {
    border-color: #6C5DD3;
}

.password-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
    margin-top: 20px;
}

.password-form label {
    font-weight: 600;
    color: var(--text);
}

.password-form input {
    padding: 14px;
    border: 2px solid #E4E4E4;
    border-radius: 12px;
    font-size: 1.1rem;
    transition: border 0.2s;
}

.password-form input:focus {
    border-color: #6C5DD3;
}

.error-msg {
    color: #FF4D4F;
    font-size: 0.9rem;
    font-weight: 500;
}

.form-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
}

.form-actions button {
    flex: 1;
    padding: 14px;
    border-radius: 12px;
}

.btn-back {
    background: #F0F0F0;
    color: #666;
    font-weight: 600;
}

.btn-back:hover {
    background: #E0E0E0;
}
```

## File: client\src\components\QuoteWidget.jsx
```jsx
import React, { useState, useEffect } from 'react';
import './Widgets.css';

const QUOTES = [
    { text: "Failure is the mother of success.", author: "Thomas Edison" },
    { text: "At the end of hardship comes happiness.", author: "Korean Proverb" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "There is no royal road to learning.", author: "Euclid" },
    { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
    { text: "Continuous small efforts lead to big achievements.", author: "Robert Collier" },
    { text: "The best jewel is relentless effort.", author: "Bertolt Brecht" },
    { text: "Success is the meeting of preparation and opportunity.", author: "Bobby Unser" },
    { text: "If you can dream it, you can achieve it.", author: "Walt Disney" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Education is the key to unlocking the world.", author: "Oprah Winfrey" }
];

const QuoteWidget = () => {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setQuote(QUOTES[randomIndex]);
    }, []);

    return (
        <div className="widget-card quote-widget">
            <h3>🌟 Today's Quote</h3>
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">- {quote.author}</p>
        </div>
    );
};

export default QuoteWidget;

```

## File: client\src\components\PhotoWidget.jsx
```jsx
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

```

## File: client\src\components\DDayWidget.jsx
```jsx
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
            const res = await fetch('http://localhost:5000/api/events');
            const data = await res.json();
            setEvents(data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:5000/api/events', {
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
            await fetch(`http://localhost:5000/api/events/${id}`, { method: 'DELETE' });
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

```

## File: client\src\components\Sidebar.jsx
```jsx
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
            const res = await fetch('http://localhost:5000/api/notifications');
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

```

## File: client\src\components\StickerBoard.jsx
```jsx
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
            const res = await fetch(`http://localhost:5000/api/stickers/daughter`);
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
            await fetch(`http://localhost:5000/api/stickers/daughter/goal`, {
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
            await fetch(`http://localhost:5000/api/stickers/daughter`, {
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
            await fetch(`http://localhost:5000/api/stickers/daughter/reset`, {
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

```

## File: client\src\components\MemoWidget.jsx
```jsx
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
            const res = await fetch('http://localhost:5000/api/memos');
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
            const res = await fetch('http://localhost:5000/api/memos', {
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
            await fetch(`http://localhost:5000/api/memos/${id}`, { method: 'DELETE' });
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

```

## File: client\src\components\TaskList.jsx
```jsx
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
                fetch(`http://localhost:5000/api/tasks?date=${date}`),
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
            const res = await fetch('http://localhost:5000/api/tasks', {
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
                    await fetch(`http://localhost:5000/api/stickers/${user.username}`, {
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
                    await fetch(`http://localhost:5000/api/stickers/${user.username}`, {
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
            await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
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
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
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

            {/* Refresh Button for Everyone */}
            <div className="refresh-container" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button className="refresh-btn" onClick={onRefresh} title="목록 새로고침">
                    🔄 새로고침
                </button>
            </div>

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

```

## File: client\src\components\TaskList.css
```css
.task-list-container {
    width: 100%;
}

/* Add Task Bar */
.add-task-bar {
    background: var(--white);
    padding: 16px;
    border-radius: var(--radius);
    box-shadow: var(--card-shadow);
    margin-bottom: 24px;
}

.horizontal-form {
    display: flex;
    gap: 12px;
}

.task-input {
    flex: 2;
    padding: 12px 16px;
    border: 2px solid #F0F0F0;
    border-radius: 12px;
    font-size: 1rem;
    transition: border 0.2s;
}

.task-input:focus {
    border-color: var(--primary);
}

.cat-select {
    flex: 1;
    padding: 12px;
    border: 2px solid #F0F0F0;
    border-radius: 12px;
    background: #fff;
    cursor: pointer;
}

@media (max-width: 600px) {
    .horizontal-form {
        flex-direction: column;
    }
}

/* Filters */
.filter-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

.tab {
    background: transparent;
    padding: 8px 16px;
    border-radius: 12px;
    font-weight: 600;
    color: var(--text-light);
}

.tab:hover {
    background: rgba(108, 93, 211, 0.05);
    color: var(--primary);
}

.tab.active {
    background: var(--primary);
    color: var(--white);
    box-shadow: 0 4px 10px rgba(108, 93, 211, 0.2);
}

/* Tasks Grid */
.tasks-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #aaa;
    font-size: 1.1rem;
}

.task-card {
    background: var(--white);
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
    border: 1px solid transparent;
}

.task-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
    border-color: rgba(108, 93, 211, 0.1);
}

.task-card.completed {
    background: #FAFAFA;
}

.task-left {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    cursor: pointer;
    flex: 1;
    min-width: 0;
    /* Critical for flex child truncation */
}

.custom-checkbox {
    min-width: 24px;
    height: 24px;
    border: 2px solid #E4E4E4;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    transition: all 0.2s;
    margin-top: 2px;
    flex-shrink: 0;
}

.task-card:hover .custom-checkbox {
    border-color: var(--primary);
}

.custom-checkbox.checked {
    background: var(--primary);
    border-color: var(--primary);
}

.task-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    /* Critical for text overflow */
}

.task-title {
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--text);
    transition: color 0.2s;
    word-break: break-word;
    /* Ensure long words wrap */
    overflow-wrap: break-word;
}

.task-card.completed .task-title {
    text-decoration: line-through;
    color: #bbb;
}

.task-cat-badge {
    font-size: 0.8rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 6px;
}

.delete-btn {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px;
    opacity: 0.6;
    transition: opacity 0.2s;
    z-index: 2;
    flex-shrink: 0;
    /* Prevent shrinking */
}

.delete-btn:hover {
    opacity: 1;
    color: #fa5252;
}

.task-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 4px;
}

.task-time-badge {
    font-size: 0.8rem;
    color: #2b8a3e;
    background: #ebfbee;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
    .tasks-grid {
        grid-template-columns: 1fr;
    }

    .horizontal-form {
        flex-direction: column;
    }

    .add-task-bar {
        padding: 12px;
    }

    .task-input {
        width: 100%;
    }

    .cat-select {
        width: 100%;
    }

    .btn-primary {
        width: 100%;
    }
}

.refresh-btn {
    background: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 0.9rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #495057;
    transition: all 0.2s;
}

.refresh-btn:hover {
    background: #dee2e6;
    transform: rotate(180deg);
    /* Simple spin effect on hover */
}

/* Disabled Checkbox Visuals for Mom */
.task-left.read-only .custom-checkbox {
    border-color: #adb5bd;
    background-color: #f1f3f5;
    cursor: default;
}

.task-left.read-only:hover {
    background-color: transparent;
    /* No hover effect for read-only */
}
```

## File: client\src\components\Widgets.css
```css
.widget-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    border: 1px solid #f1f3f5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.widget-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #495057;
    font-size: 1.1rem;
    font-weight: 600;
}

/* Quote Widget */
.quote-widget {
    background: linear-gradient(135deg, #e3fafc 0%, #e6fcf5 100%);
    border: 2px solid #c3fae8;
}

.quote-text {
    font-size: 1.1rem;
    color: #0b7285;
    font-style: italic;
    margin-bottom: 10px;
    font-family: 'Georgia', serif;
    line-height: 1.4;
}

.quote-author {
    font-size: 0.9rem;
    color: #868e96;
    font-weight: 500;
}

/* Photo Widget */
.photo-widget {
    background: linear-gradient(135deg, #fff0f6 0%, #fff9db 100%);
    border: 2px solid #ffdeeb;
    padding: 15px;
}

.photo-container {
    width: 100%;
    height: 200px;
    /* Fixed height for consistency */
    overflow: hidden;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
}

.photo-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Crop nicely */
    transition: transform 0.3s;
}

.photo-container img:hover {
    transform: scale(1.05);
}

/* Mobile Responsiveness for Sticker Board Admin */
@media (max-width: 600px) {
    .widget-card .goal-section {
        font-size: 1rem;
    }

    .sticker-stats {
        flex-direction: column;
        gap: 10px;
    }

    /* Make inputs smaller on mobile */
    .widget-card input[type="text"],
    .widget-card input[type="number"] {
        width: 100% !important;
        margin-left: 0 !important;
        margin-top: 4px;
    }

    .widget-card label {
        display: block;
        margin-bottom: 2px;
        font-size: 0.9rem;
    }
}
```

## File: client\src\App.jsx
```jsx
import React, { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight, FaSignOutAlt, FaRedo, FaMoon, FaCalendarAlt } from 'react-icons/fa';
import LoginScreen from './components/LoginScreen';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import Sidebar from './components/Sidebar';
import './App.css';

// Register Korean locale for datepicker
registerLocale('ko', ko);

function App() {
  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentDate(new Date());
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const changeDate = (days) => {
    setCurrentDate(prev => addDays(prev, days));
  };

  const handleDateSelect = ({ dateString }) => {
    const [y, m, d] = dateString.split('-').map(Number);
    setCurrentDate(new Date(y, m - 1, d));
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  // Custom Input for DatePicker to make it look like our text
  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="date-display-btn" onClick={onClick} ref={ref}>
      <FaCalendarAlt className="calendar-icon" />
      {format(currentDate, 'yyyy년 M월 d일 EEEE', { locale: ko })}
    </button>
  ));

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content container">
          <div className="brand">
            <div className="logo-icon">📚</div>
            <h1>박규리 숙제 관리</h1>
            <div className={`user-badge ${user.role}`}>
              {user.role === 'daughter' ? '👧 규리' : '👩 엄마'}
            </div>
          </div>

          <div className="header-controls">
            <div className="date-picker-wrapper">
              <DatePicker
                selected={currentDate}
                onChange={(date) => setCurrentDate(date)}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                customInput={<CustomDateInput />}
              />
            </div>
            <button className="icon-btn-round"><FaMoon /></button>
            <button className="icon-btn-round" onClick={handleRefresh}><FaRedo /></button>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> 로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="content-area">
          <ProgressBar tasks={tasks} />

          <div className="date-nav-filters">
            <button onClick={() => changeDate(-1)} className="nav-btn"><FaChevronLeft /></button>
            <div className="current-date-label-wrapper">
              <DatePicker
                selected={currentDate}
                onChange={(date) => setCurrentDate(date)}
                locale="ko"
                dateFormat="yyyy-MM-dd"
                customInput={<CustomDateInput />}
                popperPlacement="bottom"
              />
            </div>
            <button onClick={() => changeDate(1)} className="nav-btn"><FaChevronRight /></button>
          </div>

          <TaskList
            user={user}
            date={formattedDate}
            onUpdate={setTasks}
            refreshTrigger={refreshTrigger}
            onRefresh={handleRefresh}
          />
        </div>

        <aside className="sidebar-area">
          <Sidebar
            currentUser={user}
            onSelectDate={(date) => handleDateSelect({ dateString: date })}
            refreshTrigger={refreshTrigger}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;

```

## File: client\public\ive\READ_ME.txt
```txt
[How to add your own IVE photos]

1. Find a photo of IVE you like.
2. Rename it to "1.jpg", "2.jpg", "3.jpg", or "4.jpg".
3. Copy it into this folder, overwriting the existing file.
4. Refresh the app to see your photo!

```

## File: client\package.json
```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "date-fns": "^4.1.0",
    "react": "^19.2.0",
    "react-datepicker": "^9.1.0",
    "react-dom": "^19.2.0",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}

```

## File: .gitignore
```txt
# Dependencies
node_modules/

# Production Build
client/dist/

# Environment Variables
.env

# System Files
.DS_Store
Thumbs.db

```

## File: DEPLOY.md
```md
# GitHub + Replit 배포 가이드

**GitHub**는 코드를 저장하는 창고이고, **Replit**은 그 코드를 가져와서 실행(호스팅)하는 공장입니다. 두 개를 연결하는 것이 가장 안정적이고 쉽습니다.

## 1단계: GitHub에 코드 올리기

1.  **GitHub 저장소 생성**:
    - 이미 생성하셨습니다: [https://github.com/police6980/homework](https://github.com/police6980/homework)

2.  **코드를 GitHub로 전송 (터미널 명령어)**:
    - VS Code나 터미널에서 프로젝트 폴더를 엽니다.
    - **수정사항이 생길 때마다 아래 3줄만 입력하면 됩니다:**

    ```bash
    git add .
    git commit -m "수정 내용 메모"
    git push
    ```

## 2단계: Replit에서 가져오기 (처음 한 번만)

1.  [Replit](https://replit.com/) 로그인.
2.  좌측 상단 `+ Create Repl` 클릭.
3.  우측 상단 **Import from GitHub** 버튼 클릭.
4.  저장소 주소 입력: `https://github.com/police6980/homework`
5.  **Language**: `Node.js`가 자동으로 선택됩니다. `Import from GitHub` 버튼 클릭.

## 3단계: 실행 및 확인

1.  Replit이 코드를 불러오고 패키지를 설치할 때까지 기다립니다.
2.  상단 중앙 **Run** 버튼 클릭.
3.  콘솔에 "Server running..."이 뜨면 성공!
4.  우측 화면(Webview)에 앱이 보입니다. 주소를 복사해서 사용하세요.

---

## 🔄 앱 업데이트 방법 (코드를 수정했을 때)

Replit에 파일을 다시 올릴 필요가 없습니다! **버튼 클릭 한 번이면 됩니다.**

1.  내 컴퓨터에서 코드를 수정하고 GitHub에 올린다 (`git push`).
2.  **Replit 화면**으로 이동한다.
3.  좌측 메뉴에서 **Gi** (Git 아이콘)을 클릭한다.
4.  **Pull** 버튼을 클릭한다. (GitHub의 최신 코드를 당겨옵니다)
5.  업데이트가 완료되면 다시 **Stop** 후 **Run**을 눌러 재시작한다.

```

## File: generate_summary.js
```js
const fs = require('fs');
const path = require('path');

const getFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.DS_Store' || file === 'package-lock.json' || file === 'homework.db' || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg') || file.endsWith('.ico')) return;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
};

const rootDir = __dirname;
const allFiles = getFilesRecursively(rootDir);

let content = '# Homework App Codebase Summary\n\n';

allFiles.forEach(filePath => {
    try {
        const relativePath = path.relative(rootDir, filePath);
        // Skip Codebase_Summary.md itself to avoid recursion/bloat if run multiple times
        if (relativePath === 'Codebase_Summary.md') return;

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const ext = path.extname(filePath).substring(1) || 'txt';
        content += `\n## File: ${relativePath}\n\`\`\`${ext}\n${fileContent}\n\`\`\`\n`;
        console.log(`Added ${relativePath}`);
    } catch (e) {
        console.error(`Error reading ${filePath}: ${e.message}`);
    }
});

fs.writeFileSync(path.join(__dirname, 'Codebase_Summary.md'), content);
console.log('Successfully created Codebase_Summary.md');

```

## File: package.json
```json
{
    "name": "homework-app",
    "version": "1.0.0",
    "description": "Mom & Daughter Homework App",
    "scripts": {
        "start": "node server/index.js",
        "build": "cd client && npm install && npm run build",
        "install-all": "npm install && cd client && npm install && cd ../server && npm install",
        "postinstall": "npm run build"
    },
    "dependencies": {
        "express": "^4.21.2",
        "sqlite3": "^5.1.7",
        "cors": "^2.8.5",
        "body-parser": "^1.20.3"
    },
    "engines": {
        "node": ">=16.0.0"
    }
}
```

## File: walkthrough.md
```md
# 숙제 관리 앱 사용 가이드 (Homework App Walkthrough)

## 개요 (Overview)
엄마와 딸이 함께 사용하는 숙제 관리 앱입니다.  
엄마는 숙제를 등록 및 관리하고, 딸은 자신의 숙제를 확인하고 완료할 수 있습니다.  
전체적인 UI가 직관적이고 따뜻한 느낌으로 리뉴얼되었습니다.

## 시작하기 (Getting Started)

### 실행 방법 (Installation & Running)
1.  **백엔드 서버 실행**:
    터미널을 열고 다음 명령어를 입력하세요:
    ```bash
    cd server
    node index.js
    ```
    서버가 `http://localhost:5000`에서 실행됩니다.

2.  **클라이언트 실행** (개발 모드):
    새 터미널을 열고 다음 명령어를 입력하세요:
    ```bash
    cd client
    npm run dev
    ```
    클라이언트가 `http://localhost:5173`에서 실행됩니다.

3.  **브라우저 접속**:
    `http://localhost:5173` 주소로 접속하세요.

### 클라우드 배포 (Cloud Deployment)
컴퓨비를 끄고도 앱을 계속 실행하려면 **Replit**에 배포하세요. 자세한 방법은 `DEPLOY.md` 파일을 참고하세요.

## 주요 기능 (Features)

### 1. 로그인 (Login Screen)
- **👧 박규리**: 비밀번호 없이 버튼 한 번으로 로그인합니다.
- **👩 엄마**: 비밀번호(`137979`)를 입력해야 로그인할 수 있습니다.

### 2. 대시보드 (Dashboard)
- **전체 진행률 바**: 오늘 숙제의 완료 현황을 큼직한 초록색 바로 한눈에 확인할 수 있습니다.
- **날짜 이동 및 달력**: 
    - `<` `>` 버튼을 눌러 어제나 내일의 숙제를 확인합니다.
    - **가운데 날짜를 클릭하면 달력이 팝업**되어 원하는 날짜로 바로 이동할 수 있습니다.
- **숙제 목록**:
    - 학교, 수학, 영어, 구몬, 기타 등 카테고리별 **아이콘**과 함께 표시됩니다.
    - **엄마**: 상단의 입력창을 통해 숙제를 추가하거나, 목록에서 삭제할 수 있습니다.
    - **딸**: 숙제를 완료하면 터치하여 체크(✅)할 수 있습니다.
- **필터**: '전체', '진행 중', '완료됨' 탭을 눌러 보고 싶은 숙제만 골라볼 수 있습니다.
- **알림 사이드바**: 지난 날짜에 미완료된 숙제가 있다면 우측(모바일은 하단)에 빨간색 알림이 뜹니다.

### 3. 숙제 관리 (Task Management) - 👩 MOM
- **입력**: 상단의 입력창을 통해 숙제를 추가할 수 있습니다.
- **삭제**: 목록에서 휴지통 아이콘을 눌러 삭제할 수 있습니다.
- **권한 제한**: 엄마는 숙제를 **완료(체크)할 수 없습니다.** (클릭 안 됨)
- **완료 시간 확인**: 규리가 숙제를 마치면, 완료된 숙제 옆에 **"오후 0:00 완료"**라고 시간이 표시됩니다.
- **새로고침**: 우측 상단 **[🔄 새로고침]** 버튼을 눌러 목록을 최신 상태로 갱신할 수 있습니다.

### 4. 숙제 완료 (Task Completion) - 👧 DAUGHTER

## 리뉴얼 변경 사항 (UI Overhaul)
- **한글화**: 모든 메뉴와 안내 문구가 한국어로 변경되었습니다.
- **디자인**: 
    - 부드러운 파스텔 톤과 둥근 카드형 디자인 적용.
    - **진행률 바**: 크고 선명한 초록색 바로 변경하여 성취감을 높였습니다.
    - **카테고리**: 학교, 수학, 영어 등에 맞는 귀여운 아이콘을 적용했습니다.
- **입력 방식**: 엄마 로그인 시 상단에 가로형 입력창이 나타나 더 편하게 숙제를 추가할 수 있습니다.

## 문제 해결 (Troubleshooting)
- 만약 데이터가 보이지 않는다면 백엔드 서버(`node index.js`)가 켜져 있는지 확인해주세요.

```

## File: download_photos.js
```js
const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filename) => {
    const dest = path.join(__dirname, 'ive', filename);
    const file = fs.createWriteStream(dest);

    https.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            downloadImage(response.headers.location, filename);
            return;
        }
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${filename}: Status Code ${response.statusCode}`);
            fs.unlink(dest, () => { });
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename} (${fs.statSync(dest).size} bytes)`);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { });
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

// Reliable Placeholders (User can replace these files locally!)
const images = [
    { url: "https://dummyimage.com/400x500/ffb6c1/fff.jpg&text=IVE+Jang+Wonyoung", name: "1.jpg" },
    { url: "https://dummyimage.com/400x500/b6efff/fff.jpg&text=IVE+An+Yujin", name: "2.jpg" },
    { url: "https://dummyimage.com/400x500/e6e6fa/fff.jpg&text=IVE+Rei", name: "3.jpg" },
    { url: "https://dummyimage.com/400x500/fffacd/444.jpg&text=IVE+Leeseo", name: "4.jpg" }
];

console.log("Downloading placeholders...");
images.forEach(img => downloadImage(img.url, img.name));

```

## File: NEXT_STEPS.md
```md
# Developer Notes: Handover Status

## Current Status (Feb 8, 2026)
The project is a React + Express + SQLite homework management app ("Mom & Daughter").
We recently attempted to add "Fun Features":
1.  **Sticker Board**: Persistent reward system.
2.  **Mom's Memo**: A message board for Mom to leave notes.

## Known Issues (Critical)
The user reports that despite the code seemingly being correct:
- **Sticker Board**: `+` / `-` buttons are unresponsive.
- **Memo Widget**: Messages are not saving or appearing.

## Potential Causes to Investigate
1.  **Server Restart**: It is possible the `node server/index.js` process was not successfully restarted to load the new API endpoints (`/api/stickers`, `/api/memos`).
2.  **Database Locks**: SQLite might be locked, preventing schema migrations (adding columns/tables).
3.  **CORS/Network**: Verify `client/src/components/StickerBoard.jsx` fetch calls match the server port (5000).

## Key Files
- `server/index.js`: Contains the SQLite schema and API endpoints. Check specifically for the `Fun Features API` section.
- `client/src/components/StickerBoard.jsx`: Frontend for stickers.
- `client/src/components/MemoWidget.jsx`: Frontend for memos.

```

## File: server\package.json
```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "body-parser": "^2.2.2",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "sqlite3": "^5.1.7"
  }
}

```

## File: server\verify.js
```js
const http = require('http');

const makeRequest = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
};

const runVerification = async () => {
    console.log('Starting Verification...');
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // 1. Create Task for Today
    console.log('1. Creating Task for Today...');
    const t1 = await makeRequest('POST', '/api/tasks', {
        title: 'Test Task 1', category: 'School', date: today
    });
    console.log('   Result:', t1.status, t1.body.message);

    // 2. Create Task for Yesterday (Incomplete)
    console.log('2. Creating Task for Yesterday...');
    const t2 = await makeRequest('POST', '/api/tasks', {
        title: 'Missed Task', category: 'Other', date: yesterday
    });
    console.log('   Result:', t2.status, t2.body.message);

    // 3. Get Tasks for Today
    console.log('3. Fetching Tasks for Today...');
    const listToday = await makeRequest('GET', `/api/tasks?date=${today}`);
    console.log('   Count:', listToday.body.data.length);

    // 4. Mark Today's task as complete
    if (listToday.body.data.length > 0) {
        console.log('4. Completing Task...');
        const taskId = listToday.body.data[0].id;
        const update = await makeRequest('PATCH', `/api/tasks/${taskId}`, { completed: 1 });
        console.log('   Result:', update.status, update.body.message);

        // 5. Check Timestamp Logic via direct DB query (or just check PATCH response)
        // Since sqlite3 lib is used in server, we can't query DB directly from here easily without duplicating logic.
        // But we can check if marking complete added a timestamp in a future GET or simply rely on manual verify.
        // For now, let's verify the PATCH response changes.
        console.log('\n--- 5. Timestamp Verification ---');
        // Toggle complete again (to ensure completed_at is set/updated)
        await makeRequest('PATCH', `/api/tasks/${taskId}`, { completed: true });

        // Fetch to see if completed_at is there (we need to update GET to return it first? 
        // Ah, SELECT * returns all columns, so it should be there if migration worked)
        const checkRes = await makeRequest('GET', `/api/tasks?date=${today}`);
        const updatedTask = checkRes.body.data.find(t => t.id === taskId);

        if (updatedTask && updatedTask.completed_at) {
            console.log(`   ✅ Timestamp verified: ${updatedTask.completed_at}`);
        } else {
            console.error('   ❌ Timestamp missing or not updated!');
            console.log(updatedTask);
        }
    }

    // 6. Check Notifications (Should show Yesterday)
    console.log('\n6. Checking Notifications...');
    const notifs = await makeRequest('GET', '/api/notifications');
    console.log('   Incomplete Dates:', notifs.body.dates);

    if (notifs.body.dates && notifs.body.dates.includes(yesterday)) {
        console.log('   SUCCESS: Yesterday is in incomplete list.');
    } else {
        console.log('   FAILURE: Yesterday missing from notifications.');
    }
};

runVerification().catch(console.error);

```

## File: server\index.js
```js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve Static Files from React App
app.use(express.static(path.join(__dirname, '../client/dist')));

// Database Setup
// Database Setup
// On Vercel (Read-Only FS), use /tmp. On Render/Local, use current directory.
const dbPath = process.env.VERCEL
    ? path.join('/tmp', 'homework.db')
    : path.resolve(__dirname, 'homework.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTable();
    }
});

const createTable = () => {
    db.serialize(() => {
        // 1. Tasks Table
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            completed INTEGER DEFAULT 0,
            completed_at TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`);

        // 2. Users Table (for Stickers)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT,
            stickers INTEGER DEFAULT 0,
            reward_goal TEXT DEFAULT '치킨',
            sticker_target INTEGER DEFAULT 20
        )`);

        // 3. Messages Table (for Memos)
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT,
            created_at TEXT
        )`);

        // 4. Migrations (Add columns if missing for existing installs)
        // Add completed_at to tasks
        db.run("ALTER TABLE tasks ADD COLUMN completed_at TEXT", (err) => {
            if (!err) console.log("Migration: completed_at added");
        });

        // Add sticker columns to users (if table existed but cols didn't - unlikely here but good practice)
        try {
            const userCols = ['stickers', 'reward_goal', 'sticker_target'];
            userCols.forEach(col => {
                db.run(`ALTER TABLE users ADD COLUMN ${col} TEXT`, (err) => { });
            });
        } catch (e) { }

        // 5. Seed Users
        db.get("SELECT * FROM users WHERE username = 'mom'", (err, row) => {
            if (!row) {
                db.run("INSERT INTO users (username, password, role) VALUES ('mom', '137979', 'mom')");
                console.log("Seeded user: mom");
            }
        });
        db.get("SELECT * FROM users WHERE username = 'daughter'", (err, row) => {
            if (!row) {
                db.run("INSERT INTO users (username, password, role) VALUES ('daughter', '', 'daughter')");
                console.log("Seeded user: daughter");
            }
        });

        console.log("Database tables checked/created.");
    });
};

// API Endpoints

// GET /api/tasks?date=YYYY-MM-DD
app.get('/api/tasks', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'Date parameter is required' });
    }
    const sql = 'SELECT * FROM tasks WHERE date = ?';
    db.all(sql, [date], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
    const { title, category, date } = req.body;
    if (!title || !category || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const sql = 'INSERT INTO tasks (title, category, date, completed) VALUES (?, ?, ?, 0)';
    db.run(sql, [title, category, date], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: this.lastID, title, category, date, completed: 0, completed_at: null }
        });
    });
});

// PATCH /api/tasks/:id (Toggle completion or edit)
app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed, title, category } = req.body;

    let sql = 'UPDATE tasks SET ';
    const params = [];

    if (completed !== undefined) {
        sql += 'completed = ?, ';
        params.push(completed ? 1 : 0);

        // Update completed_at timestamp
        sql += 'completed_at = ?, ';
        if (completed) {
            // If marking as complete, save current time (local time formatted)
            const now = new Date();
            // Format: HH:mm (e.g., 14:30)
            const timeString = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
            params.push(timeString);
        } else {
            // If unchecking, clear the timestamp
            params.push(null);
        }
    }
    if (title !== undefined) {
        sql += 'title = ?, ';
        params.push(title);
    }
    if (category !== undefined) {
        sql += 'category = ?, ';
        params.push(category);
    }

    sql = sql.slice(0, -2);
    sql += ' WHERE id = ?';
    params.push(id);

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            changes: this.changes
        });
    });
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, id, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'deleted', changes: this.changes });
    });
});

// GET /api/notifications (Past incomplete tasks)
app.get('/api/notifications', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const sql = 'SELECT DISTINCT date FROM tasks WHERE date < ? AND completed = 0 ORDER BY date ASC';
    db.all(sql, [today], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            dates: rows.map(r => r.date)
        });
    });
});

// --- FUN FEATURES API ---

// 1. Stickers & Goal
app.get('/api/stickers/:username', (req, res) => {
    db.get("SELECT stickers, reward_goal, sticker_target FROM users WHERE username = ?", [req.params.username], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            stickers: row ? row.stickers : 0,
            reward_goal: row ? row.reward_goal : '치킨',
            sticker_target: row ? row.sticker_target : 20
        });
    });
});

app.post('/api/stickers/:username', (req, res) => {
    const { delta } = req.body;
    db.run("UPDATE users SET stickers = MAX(0, stickers + ?) WHERE username = ?", [delta, req.params.username], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'success' });
    });
});

app.post('/api/stickers/:username/goal', (req, res) => {
    const { goal, target } = req.body;
    let query = "UPDATE users SET ";
    let params = [];
    if (goal !== undefined) {
        query += "reward_goal = ?, ";
        params.push(goal);
    }
    if (target !== undefined) {
        query += "sticker_target = ?, ";
        params.push(target);
    }
    if (params.length === 0) return res.json({ message: 'no changes' });

    query = query.slice(0, -2);
    query += " WHERE username = ?";
    params.push(req.params.username);

    db.run(query, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'success' });
    });
});

app.post('/api/stickers/:username/reset', (req, res) => {
    db.run("UPDATE users SET stickers = 0 WHERE username = ?", [req.params.username], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'success' });
    });
});

// 2. Memos (List)
app.get('/api/memos', (req, res) => {
    db.all("SELECT * FROM messages ORDER BY id DESC LIMIT 20", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.post('/api/memos', (req, res) => {
    const { content } = req.body;
    const createdAt = new Date().toISOString();
    db.run("INSERT INTO messages (content, created_at) VALUES (?, ?)", [content, createdAt], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'success', data: { id: this.lastID, content, created_at: createdAt } });
    });
});

app.delete('/api/memos/:id', (req, res) => {
    db.run("DELETE FROM messages WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'success' });
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

```
