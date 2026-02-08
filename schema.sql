-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL, -- YYYY-MM-DD
    completed INTEGER DEFAULT 0, -- 0 or 1
    completed_at TEXT, -- HH:mm string or null
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Users Table (for Stickers)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    stickers INTEGER DEFAULT 0,
    reward_goal TEXT DEFAULT '치킨',
    sticker_target INTEGER DEFAULT 20
);

-- Messages Table (Memos)
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Users (Optional, only if empty)
INSERT OR IGNORE INTO users (username, password, role, stickers, reward_goal, sticker_target) 
VALUES ('mom', '137979', 'mom', 0, '치킨', 20);

INSERT OR IGNORE INTO users (username, password, role, stickers, reward_goal, sticker_target) 
VALUES ('daughter', '', 'daughter', 0, '치킨', 20);
