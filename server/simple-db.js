const fs = require('fs');
const path = require('path');

// Determine database path
// On Vercel (Read-Only FS), use /tmp. On Render/Local, use current directory.
const DB_PATH = process.env.VERCEL
    ? path.join('/tmp', 'database.json')
    : path.resolve(__dirname, 'database.json');

// Initial Data Structure
const INITIAL_DATA = {
    tasks: [],
    users: [
        { id: 1, username: 'mom', password: 'mom', role: 'mom', stickers: 0, reward_goal: '치킨', sticker_target: 20 },
        { id: 2, username: 'daughter', password: '', role: 'daughter', stickers: 0, reward_goal: '치킨', sticker_target: 20 }
    ],
    messages: [], // Memos
    nextIds: {
        tasks: 1,
        users: 3,
        messages: 1
    }
};

class SimpleDB {
    constructor() {
        this.data = null;
        this.load();
    }

    load() {
        try {
            if (fs.existsSync(DB_PATH)) {
                const raw = fs.readFileSync(DB_PATH, 'utf8');
                this.data = JSON.parse(raw);
                // Ensure structure
                if (!this.data.tasks) this.data.tasks = [];
                if (!this.data.users) this.data.users = [];
                if (!this.data.messages) this.data.messages = [];
                if (!this.data.nextIds) this.data.nextIds = { tasks: 1, users: 1, messages: 1 };
            } else {
                this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
                this.save();
            }
        } catch (err) {
            console.error("Failed to load DB, resetting:", err);
            this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
            this.save();
        }
    }

    save() {
        try {
            fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
        } catch (err) {
            console.error("Failed to save DB:", err);
        }
    }

    // --- Tasks ---
    getTasks(date) {
        return this.data.tasks.filter(t => t.date === date);
    }

    addTask(task) {
        const newTask = {
            id: this.data.nextIds.tasks++,
            ...task,
            completed: 0,
            created_at: new Date().toISOString()
        };
        this.data.tasks.push(newTask);
        this.save();
        return newTask;
    }

    updateTask(id, updates) {
        const taskIndex = this.data.tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1) return 0; // No changes

        this.data.tasks[taskIndex] = { ...this.data.tasks[taskIndex], ...updates };
        this.save();
        return 1; // 1 change
    }

    deleteTask(id) {
        const initialLength = this.data.tasks.length;
        this.data.tasks = this.data.tasks.filter(t => t.id !== parseInt(id));
        this.save();
        return initialLength - this.data.tasks.length;
    }

    getIncompleteDates(beforeDate) {
        // SELECT DISTINCT date FROM tasks WHERE date < ? AND completed = 0 ORDER BY date ASC
        const dates = new Set();
        this.data.tasks.forEach(t => {
            if (t.date < beforeDate && t.completed === 0) {
                dates.add(t.date);
            }
        });
        return Array.from(dates).sort();
    }

    // --- Users (Stickers) ---
    getUser(username) {
        return this.data.users.find(u => u.username === username);
    }

    updateUserStickers(username, delta) {
        const user = this.getUser(username);
        if (!user) {
            console.error(`[DB] User not found: ${username}`);
            return;
        }
        const current = parseInt(user.stickers) || 0;
        const change = parseInt(delta) || 0;
        user.stickers = Math.max(0, current + change);
        console.log(`[DB] Updated stickers for ${username}: ${user.stickers}`);
        this.save();
    }

    updateUserGoal(username, goal, target) {
        const user = this.getUser(username);
        if (!user) return;
        if (goal !== undefined) user.reward_goal = goal;
        if (target !== undefined) user.sticker_target = target;
        this.save();
    }

    resetUserStickers(username) {
        const user = this.getUser(username);
        if (!user) return;
        user.stickers = 0;
        this.save();
    }

    // --- Memos (Messages) ---
    getMemos() {
        // SELECT * FROM messages ORDER BY id DESC LIMIT 20
        return [...this.data.messages].sort((a, b) => b.id - a.id).slice(0, 20);
    }

    addMemo(content) {
        const newMemo = {
            id: this.data.nextIds.messages++,
            content,
            created_at: new Date().toISOString()
        };
        this.data.messages.push(newMemo);
        this.save();
        return newMemo;
    }

    deleteMemo(id) {
        this.data.messages = this.data.messages.filter(m => m.id !== parseInt(id));
        this.save();
    }
}

module.exports = new SimpleDB();
