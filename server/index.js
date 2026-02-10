const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./simple-db'); // Use our new simple JSON DB

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve Static Files from React App
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Endpoints

// GET /api/tasks?date=YYYY-MM-DD
app.get('/api/tasks', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'Date parameter is required' });
    }
    const tasks = db.getTasks(date);
    res.json({
        message: 'success',
        data: tasks
    });
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
    const { title, category, date } = req.body;
    if (!title || !category || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newTask = db.addTask({ title, category, date });
    res.json({
        message: 'success',
        data: newTask // newTask includes id, completed: 0, etc.
    });
});

// PATCH /api/tasks/:id (Toggle completion or edit)
app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed, title, category } = req.body;

    const updates = {};
    if (completed !== undefined) {
        updates.completed = completed ? 1 : 0;
        if (completed) {
            const now = new Date();
            updates.completed_at = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
        } else {
            updates.completed_at = null;
        }
    }
    if (title !== undefined) updates.title = title;
    if (category !== undefined) updates.category = category;

    const changes = db.updateTask(id, updates);
    res.json({
        message: 'success',
        changes: changes
    });
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const changes = db.deleteTask(id);
    res.json({ message: 'deleted', changes: changes });
});

// GET /api/notifications (Past incomplete tasks)
app.get('/api/notifications', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const dates = db.getIncompleteDates(today);
    res.json({
        message: 'success',
        dates: dates
    });
});

// --- FUN FEATURES API ---

// 1. Stickers & Goal
app.get('/api/stickers/:username', (req, res) => {
    const user = db.getUser(req.params.username);
    res.json({
        stickers: user ? user.stickers : 0,
        reward_goal: user ? user.reward_goal : '치킨',
        sticker_target: user ? user.sticker_target : 20
    });
});

app.post('/api/stickers/:username', (req, res) => {
    const { delta } = req.body;
    console.log(`[API] Updating stickers for ${req.params.username}, delta: ${delta}`);

    // Ensure delta is a number
    const deltaNum = parseInt(delta, 10);
    if (isNaN(deltaNum)) {
        return res.status(400).json({ error: 'Invalid delta value' });
    }

    db.updateUserStickers(req.params.username, deltaNum);
    res.json({ message: 'success' });
});

app.post('/api/stickers/:username/goal', (req, res) => {
    const { goal, target } = req.body;
    db.updateUserGoal(req.params.username, goal, target);
    res.json({ message: 'success' });
});

app.post('/api/stickers/:username/reset', (req, res) => {
    db.resetUserStickers(req.params.username);
    res.json({ message: 'success' });
});

// 2. Memos (List)
app.get('/api/memos', (req, res) => {
    const memos = db.getMemos();
    res.json({ data: memos });
});

app.post('/api/memos', (req, res) => {
    const { content } = req.body;
    const newMemo = db.addMemo(content);
    res.json({ message: 'success', data: newMemo });
});

app.delete('/api/memos/:id', (req, res) => {
    db.deleteMemo(req.params.id);
    res.json({ message: 'success' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

