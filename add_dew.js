const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newFlavor = 
            mirinda_apple: {
                inner: '#2e8a0b', mid: '#184e04', outer: '#051401',
                name: 'Mirinda Apple', modelTexture: 'mirinda_apple',
                berryType: 'emoji', berrySrc: '🍏',
                thumb: 'assets/mirinda_apple.jpg',
                thumbStyle: 'mix-blend-mode: multiply; filter: brightness(1.2);'
            },
            dew: {
                inner: '#4c8a0b', mid: '#284e04', outer: '#0a1401',
                name: 'Mountain Dew', modelTexture: 'green',
                berryType: 'emoji', berrySrc: '🍋',
                thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mountain_Dew_can.png/320px-Mountain_Dew_can.png',
                thumbStyle: ''
            }
;
html = html.replace(/mirinda_apple: \{[\s\S]*?\}\n/, newFlavor);

const newCard = 
                        <!-- Mirinda Apple -->
                        <div class="card" data-flavor="mirinda_apple" onclick="selectFlavor('mirinda_apple')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="assets/mirinda_apple.jpg" style="mix-blend-mode: multiply; filter: brightness(1.2);" alt="Mirinda Apple Can">
                            <div class="card-info">
                                <span>Mirinda Apple</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>

                        <!-- Mountain Dew -->
                        <div class="card" data-flavor="dew" onclick="selectFlavor('dew')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mountain_Dew_can.png/320px-Mountain_Dew_can.png" alt="Mountain Dew Can">
                            <div class="card-info">
                                <span>Mountain Dew</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>
;
html = html.replace(/<!-- Mirinda Apple -->[\s\S]*?<\/div>\n\s*<\/div>/, newCard + '\n                    </div>');

fs.writeFileSync('index.html', html);
