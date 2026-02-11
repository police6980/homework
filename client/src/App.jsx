import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight, FaSignOutAlt, FaRedo, FaMoon, FaSun, FaCalendarAlt } from 'react-icons/fa';
import LoginScreen from './components/LoginScreen';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import Sidebar from './components/Sidebar';
import './App.css';

// Register Korean locale for datepicker
registerLocale('ko', ko);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>⚠️ Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState('tasks'); // 'tasks' | 'stickers'

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
            <div>
              <h1>박규리 숙제 관리</h1>
              <small style={{ fontSize: '0.7rem', color: '#ccc' }}>v1.4 (Debug Mode)</small>
            </div>
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
            <button
              className="icon-btn-round"
              onClick={toggleDarkMode}
              data-tooltip={darkMode ? "라이트 모드" : "다크 모드"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="icon-btn-round"
              onClick={handleRefresh}
              data-tooltip="목록 새로고침"
            >
              <FaRedo />
            </button>
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

          {/* Mobile Tabs (Only visible on mobile) */}
          <div className="mobile-tab-nav">
            <button
              className={`mobile-tab ${mobileTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setMobileTab('tasks')}
            >
              📝 할 일 목록
            </button>
            <button
              className={`mobile-tab ${mobileTab === 'stickers' ? 'active' : ''}`}
              onClick={() => setMobileTab('stickers')}
            >
              ⭐ 스티커판
            </button>
          </div>

          {/* Content Switcher */}
          <div className={`mobile-content-wrapper ${mobileTab === 'stickers' ? 'show-stickers' : ''}`}>
            <div className="mobile-view-tasks">
              <TaskList
                user={user}
                date={formattedDate}
                onUpdate={setTasks}
                refreshTrigger={refreshTrigger}
                onRefresh={handleRefresh}
              />
            </div>
            <div className="mobile-view-sidebar">
              <Sidebar
                currentUser={user}
                onSelectDate={(date) => handleDateSelect({ dateString: date })}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>

        {/* Desktop Sidebar (Hidden on Mobile via CSS) */}
        <aside className="sidebar-area desktop-only">
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
