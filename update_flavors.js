const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const newHtml = html.replace(/const flavorThemes = \{[\s\S]*?\};\n\n        const flavorKeys = Object.keys\(flavorThemes\);/, 
        const flavorThemes = {
            classic: {
                inner: '#0b8a4f', mid: '#044e29', outer: '#011409',
                name: 'Diet Classic', modelTexture: 'green',
                berryType: 'model', berrySrc: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb',
                thumb: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/Green%20Soda.png',
                thumbStyle: ''
            },
            zero: {
                inner: '#0b4f8a', mid: '#04294e', outer: '#010c14',
                name: 'Zero Lime', modelTexture: 'blue',
                berryType: 'model', berrySrc: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/blueberry.glb',
                thumb: 'https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/Blue%20Soda.png',
                thumbStyle: ''
            },
            stoney: {
                inner: '#8c5311', mid: '#4d2d09', outer: '#140c02',
                name: 'Stoney Tangawizi', modelTexture: 'stoney',
                berryType: 'emoji', berrySrc: '🍋‍🟩',
                thumb: 'assets/stoney_can_gen.jpg',
                thumbStyle: 'mix-blend-mode: multiply;'
            },
            mirinda_pine: {
                inner: '#8a7a0b', mid: '#4e4604', outer: '#141201',
                name: 'Mirinda Pineapple', modelTexture: 'mirinda_pine',
                berryType: 'emoji', berrySrc: '🍍',
                thumb: 'assets/mirinda_pineapple.jpg',
                thumbStyle: 'mix-blend-mode: multiply;'
            },
            mirinda_apple: {
                inner: '#2e8a0b', mid: '#184e04', outer: '#051401',
                name: 'Mirinda Apple', modelTexture: 'mirinda_apple',
                berryType: 'emoji', berrySrc: '🍏',
                thumb: 'assets/mirinda_apple.jpg',
                thumbStyle: 'mix-blend-mode: multiply;'
            }
        };

        const flavorKeys = Object.keys(flavorThemes);
);
fs.writeFileSync('index.html', newHtml);
