const https = require('https');
const fs = require('fs');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

const images = {
    'mirinda_pineapple.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pineapple_juice.jpg/320px-Pineapple_juice.jpg', // placeholder
    'mirinda_apple.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Apple_juice_in_glass.jpg/320px-Apple_juice_in_glass.jpg', // placeholder
    'stoney.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Stoney_Tangawizi.jpg/320px-Stoney_Tangawizi.jpg'
};

async function main() {
    for (const [name, url] of Object.entries(images)) {
        await download(url, 'assets/' + name);
    }
}
main();
