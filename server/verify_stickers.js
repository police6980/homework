const http = require('http');

const BASE_URL = 'http://localhost:5000/api/stickers/daughter';

function request(url, options, data) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const reqOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: options.headers || {}
        };

        const req = http.request(reqOptions, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function testStickerAPI() {
    console.log("=== Starting Sticker API Verification ===");

    try {
        // 1. Reset
        console.log("\n1. Testing Reset...");
        let res = await request(`${BASE_URL}/reset`, { method: 'POST' });
        if (res.status !== 200) throw new Error(`Reset failed: ${res.status}`);
        console.log("   Reset OK");

        // Verify 0
        res = await request(BASE_URL, { method: 'GET' });
        if (res.data.stickers !== 0) throw new Error(`Expected 0 stickers, got ${res.data.stickers}`);
        console.log("   Initial state verified: 0 stickers");

        // 2. Add Stickers
        console.log("\n2. Testing Add Sticker (+1)...");
        res = await request(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { delta: 1 });
        if (res.status !== 200) throw new Error(`Add failed: ${res.status}`);

        res = await request(BASE_URL, { method: 'GET' });
        if (res.data.stickers !== 1) throw new Error(`Expected 1 sticker, got ${res.data.stickers}`);
        console.log("   Count verified: 1 sticker");

        // 3. Remove Stickers
        console.log("\n3. Testing Remove Sticker (-1)...");
        res = await request(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { delta: -1 });

        res = await request(BASE_URL, { method: 'GET' });
        if (res.data.stickers !== 0) throw new Error(`Expected 0 stickers, got ${res.data.stickers}`);
        console.log("   Count verified: 0 stickers");

        // 4. Test Goal Update
        console.log("\n4. Testing Goal Update...");
        const newGoal = "Pizza";
        const newTarget = 10;
        res = await request(`${BASE_URL}/goal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { goal: newGoal, target: newTarget });

        res = await request(BASE_URL, { method: 'GET' });
        if (res.data.reward_goal !== newGoal || res.data.sticker_target !== newTarget) {
            throw new Error(`Goal update failed. Expected ${newGoal}/${newTarget}, got ${res.data.reward_goal}/${res.data.sticker_target}`);
        }
        console.log("   Goal update verified");

        // 5. Validation Test (Invalid Delta)
        console.log("\n5. Testing Validation...");
        res = await request(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { delta: "invalid" });
        if (res.status !== 400) throw new Error(`Validation check failed. Expected 400, got ${res.status}`);
        console.log("   Validation verified (400 Bad Request)");

        console.log("\n=== ALL TESTS PASSED ===");

    } catch (err) {
        if (err.code === 'ECONNREFUSED') {
            console.error("\n❌ Server is not running. Please start the server and try again.");
        } else {
            console.error("\n❌ TEST FAILED:", err.message);
        }
        process.exit(1);
    }
}

testStickerAPI();
