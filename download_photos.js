const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadImage = (url, filename) => {
    const dest = path.join(__dirname, 'ive', filename);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
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
