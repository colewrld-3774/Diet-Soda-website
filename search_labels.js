const https = require('https');
const fs = require('fs');

async function search(query) {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    return new Promise((resolve, reject) => {
        https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/vqd=([\d-]+)/);
                if (!match) return resolve(null);
                const vqd = match[1];
                const imgUrl = `https://duckduckgo.com/i.js?q=${encodeURIComponent(query)}&o=json&vqd=${vqd}`;
                https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                    let data2 = '';
                    res2.on('data', chunk => data2 += chunk);
                    res2.on('end', () => {
                        try {
                            const json = JSON.parse(data2);
                            const res = json.results.find(r => r.image.endsWith('.jpg') || r.image.endsWith('.png'));
                            resolve(res ? res.image : null);
                        } catch (e) { resolve(null); }
                    });
                });
            });
        }).on('error', reject);
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    const items = {
        'stoney_label.jpg': 'Stoney Tangawizi label flat',
        'mirinda_pine_label.jpg': 'Mirinda Pineapple label flat',
        'mirinda_apple_label.jpg': 'Mirinda Apple label flat'
    };
    for (const [file, q] of Object.entries(items)) {
        console.log('Searching', q);
        const url = await search(q);
        if (url) {
            console.log('Downloading', url);
            await download(url, 'assets/' + file);
        }
    }
}
main();
