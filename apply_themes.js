const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/modelTexture: 'stoney',/, "modelTexture: 'stoney',\n                flatLabel: 'assets/stoney_label.png',");
html = html.replace(/modelTexture: 'mirinda_pine',/, "modelTexture: 'mirinda_pine',\n                flatLabel: 'assets/mirinda_pine_label.png',");
html = html.replace(/modelTexture: 'mirinda_apple',/, "modelTexture: 'mirinda_apple',\n                flatLabel: 'assets/mirinda_apple_label.png',");
html = html.replace(/modelTexture: 'dew',/, "modelTexture: 'dew',\n                flatLabel: 'assets/dew_label.png',");

fs.writeFileSync('index.html', html);
