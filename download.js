const https = require('https');
const fs = require('fs');

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
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
    'stoney.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Stoney_Tangawizi.jpg/320px-Stoney_Tangawizi.jpg',
    'mountain_dew.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mountain_Dew_can.png/320px-Mountain_Dew_can.png',
    'mirinda.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Mirinda_Orange_can.jpg/320px-Mirinda_Orange_can.jpg',
    'fanta.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Fanta_Orange_can.png/320px-Fanta_Orange_can.png',
    'coke.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_can.png/320px-Coca-Cola_can.png',
    'pineapple.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/320px-Pineapple_and_cross_section.jpg',
    'apple.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/320px-Honeycrisp.jpg',
    'orange.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/320px-Orange-Whole-%26-Split.jpg',
    'ginger.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ginger_Root.jpg/320px-Ginger_Root.jpg'
};

async function main() {
    if (!fs.existsSync('assets')) fs.mkdirSync('assets');
    for (const [name, url] of Object.entries(images)) {
        try {
            console.log('Downloading', name);
            await download(url, 'assets/' + name);
        } catch (e) {
            console.log('Error', name, e.message);
        }
    }
}
main();
