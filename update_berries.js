const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<model-viewer class="berry (.*?)" src="(.*?)" (.*?)><\/model-viewer>/g, 
    '<div class="berry " data-orbit=""><model-viewer src=""  style="width:100%; height:100%;"></model-viewer></div>');

// Add styles
const styles = 
        .berry {
            position: absolute;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 50px;
            filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
            pointer-events: none;
        }
;
html = html.replace('</style>', styles + '\n</style>');

// Modify the switchFlavorAnimation to handle emoji
html = html.replace(/berry\.src = theme\.berrySrc;/g, 
if (theme.berryType === 'emoji') {
                            berry.innerHTML = theme.berrySrc;
                        } else {
                            berry.innerHTML = \<model-viewer src="\" \ style="width:100%; height:100%;"></model-viewer>\;
                        });

fs.writeFileSync('index.html', html);
