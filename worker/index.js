import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import manifest from '__STATIC_CONTENT_MANIFEST';

const app = new Hono();

// Middleware
app.use('*', async (c, next) => {
    console.log(`[${c.req.method}] ${c.req.path}`);
    await next();
});
app.use('/*', cors());

// ... (API Routes remain same) ...

// --- Static Assets (React App) ---
// 1. Try to serve matching static file
app.use('/*', serveStatic({ root: './', manifest }));

// 2. Fallback for SPA: serve index.html for non-API routes that missed static files
app.get('*', serveStatic({ path: 'index.html', root: './', manifest })); // Try path approach
// Note: If path isn't supported, we rely on rewrite in step 1 or explicit handler.
// Let's try explicit rewrite in the first handler instead if unsure.
// BETTER APPROACH below:


// --- API Routes (D1 Database) ---

// GET /api/tasks?date=YYYY-MM-DD
app.get('/api/tasks', async (c) => {
    const date = c.req.query('date');
    if (!date) return c.json({ error: 'Date required' }, 400);

    const { results } = await c.env.DB.prepare('SELECT * FROM tasks WHERE date = ?').bind(date).all();
    return c.json({ message: 'success', data: results });
});

// POST /api/tasks
app.post('/api/tasks', async (c) => {
    const { title, category, date } = await c.req.json();
    if (!title || !category || !date) return c.json({ error: 'Missing fields' }, 400);

    const { success, meta } = await c.env.DB.prepare(
        'INSERT INTO tasks (title, category, date, completed) VALUES (?, ?, ?, 0)'
    ).bind(title, category, date).run();

    if (success) {
        // Fetch the newly created task to return full object
        const newTask = await c.env.DB.prepare('SELECT * FROM tasks WHERE id = ?').bind(meta.last_row_id).first();
        return c.json({ message: 'success', data: newTask });
    } else {
        return c.json({ error: 'Failed to create task' }, 500);
    }
});

// PATCH /api/tasks/:id
app.patch('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();

    let query = 'UPDATE tasks SET ';
    const params = [];

    if (body.completed !== undefined) {
        query += 'completed = ?, ';
        params.push(body.completed ? 1 : 0);

        query += 'completed_at = ?, ';
        if (body.completed) {
            // Hono/Workers run in UTC usually, but we can format simply or use offset
            // Minimal approach: formatted string
            const now = new Date();
            const timeString = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Seoul' });
            params.push(timeString);
        } else {
            params.push(null);
        }
    }
    if (body.title !== undefined) {
        query += 'title = ?, ';
        params.push(body.title);
    }
    if (body.category !== undefined) {
        query += 'category = ?, ';
        params.push(body.category);
    }

    query = query.slice(0, -2); // remove trailing comma
    query += ' WHERE id = ?';
    params.push(id);

    const { success } = await c.env.DB.prepare(query).bind(...params).run();
    return c.json({ message: success ? 'success' : 'failed' });
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', async (c) => {
    const id = c.req.param('id');
    const { success } = await c.env.DB.prepare('DELETE FROM tasks WHERE id = ?').bind(id).run();
    return c.json({ message: success ? 'deleted' : 'failed' });
});


// GET /api/notifications (Past Incomplete)
app.get('/api/notifications', async (c) => {
    const today = new Date().toISOString().split('T')[0];
    const { results } = await c.env.DB.prepare(
        'SELECT DISTINCT date FROM tasks WHERE date < ? AND completed = 0 ORDER BY date ASC'
    ).bind(today).all();
    return c.json({ message: 'success', dates: results.map(r => r.date) });
});


// --- Stickers & Users ---

app.get('/api/stickers/:username', async (c) => {
    const username = c.req.param('username');
    const user = await c.env.DB.prepare('SELECT * FROM users WHERE username = ?').bind(username).first();
    return c.json({
        stickers: user ? user.stickers : 0,
        reward_goal: user ? user.reward_goal : '치킨',
        sticker_target: user ? user.sticker_target : 20
    });
});

app.post('/api/stickers/:username', async (c) => {
    const username = c.req.param('username');
    const { delta } = await c.req.json();

    // Ensure user exists (Fail-safe)
    const user = await c.env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
    if (!user) {
        await c.env.DB.prepare(
            "INSERT INTO users (username, password, role, stickers, reward_goal, sticker_target) VALUES (?, '', 'daughter', 0, '치킨', 20)"
        ).bind(username).run();
    }

    await c.env.DB.prepare('UPDATE users SET stickers = MAX(0, stickers + ?) WHERE username = ?').bind(delta, username).run();
    return c.json({ message: 'success' });
});

app.post('/api/stickers/:username/goal', async (c) => {
    const username = c.req.param('username');
    const { goal, target } = await c.req.json();

    let query = 'UPDATE users SET ';
    const params = [];
    if (goal !== undefined) { query += 'reward_goal = ?, '; params.push(goal); }
    if (target !== undefined) { query += 'sticker_target = ?, '; params.push(target); }

    if (params.length === 0) return c.json({ message: 'no changes' });

    query = query.slice(0, -2);
    query += ' WHERE username = ?';
    params.push(username);

    await c.env.DB.prepare(query).bind(...params).run();
    return c.json({ message: 'success' });
});

app.post('/api/stickers/:username/reset', async (c) => {
    const username = c.req.param('username');
    await c.env.DB.prepare('UPDATE users SET stickers = 0 WHERE username = ?').bind(username).run();
    return c.json({ message: 'success' });
});


// --- Memos ---

app.get('/api/memos', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT * FROM messages ORDER BY id DESC LIMIT 20').all();
    return c.json({ data: results });
});

app.post('/api/memos', async (c) => {
    const { content } = await c.req.json();
    const { success, meta } = await c.env.DB.prepare('INSERT INTO messages (content) VALUES (?)').bind(content).run();
    return c.json({ message: 'success', data: { id: meta.last_row_id, content } }); // simple return
});

app.delete('/api/memos/:id', async (c) => {
    const id = c.req.param('id');
    await c.env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
    return c.json({ message: 'success' });
});


// --- Static Assets (React App) ---
app.use('/*', serveStatic({
    root: './',
    manifest,
    rewriteRequestPath: (path) => {
        if (path === '/') return '/index.html'; // Explicitly map root to index.html
        return path;
    }
}));

// Fallback: If above didn't find file, force index.html (for SPA routing like /timer)
app.notFound(async (c) => {
    if (c.req.path.startsWith('/api/')) {
        return c.json({ message: 'Not Found' }, 404);
    }
    // Reuse serveStatic logic for index.html? 
    // Hono serveStatic doesn't easily expose "serve this specific file" without a request.
    // Instead, we can assume the frontend router handles everything else if we load index.html.
    // Let's try just the rewrite first, usually robust enough for / and /index.html.
    return c.text('404 Not Found (Client Route)', 404);
});


export default app;
