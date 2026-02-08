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
