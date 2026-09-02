const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace <model-viewer class="berry"...> with <div class="berry"...><model-viewer...></model-viewer></div>
// wait, easier to just regex replace the entire berries-container and berries-container-bg

const bgBerries = 
            <div class="berries-container-bg">
                <div class="berry b7"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="-20deg 110deg 105%"></model-viewer></div>
                <div class="berry b8"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="160deg 45deg 105%"></model-viewer></div>
                <div class="berry b9"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="45deg 20deg 105%"></model-viewer></div>
            </div>;

const fgBerries = 
            <div class="berries-container">
                <div class="berry b1"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="45deg 120deg 105%"></model-viewer></div>
                <div class="berry b2"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-120deg 45deg 105%"></model-viewer></div>
                <div class="berry b3"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="200deg 90deg 105%"></model-viewer></div>
                <div class="berry b4"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="10deg 20deg 105%"></model-viewer></div>
                <div class="berry b5"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-45deg 160deg 105%"></model-viewer></div>
                <div class="berry b6"><model-viewer src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/cherry.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="80deg 75deg 105%"></model-viewer></div>
            </div>;

html = html.replace(/<div class="berries-container-bg">[\s\S]*?<\/div>/, bgBerries);
html = html.replace(/<div class="berries-container">[\s\S]*?<\/div>/, fgBerries);

const carousel = 
                    <div class="carousel-cards-wrapper" id="carouselWrapper">
                        <!-- Diet Classic -->
                        <div class="card active" data-flavor="classic" onclick="selectFlavor('classic')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/Green%20Soda.png" alt="Diet Classic Can">
                            <div class="card-info">
                                <span>Diet Classic</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>

                        <!-- Zero Lime -->
                        <div class="card" data-flavor="zero" onclick="selectFlavor('zero')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/Blue%20Soda.png" alt="Zero Lime Can">
                            <div class="card-info">
                                <span>Zero Lime</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>

                        <!-- Stoney Tangawizi -->
                        <div class="card" data-flavor="stoney" onclick="selectFlavor('stoney')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="assets/stoney_can_gen.jpg" style="mix-blend-mode: multiply; filter: brightness(1.2);" alt="Stoney Tangawizi Can">
                            <div class="card-info">
                                <span>Stoney Ginger</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>

                        <!-- Mirinda Pineapple -->
                        <div class="card" data-flavor="mirinda_pine" onclick="selectFlavor('mirinda_pine')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="assets/mirinda_pineapple.jpg" style="mix-blend-mode: multiply; filter: brightness(1.2);" alt="Mirinda Pineapple Can">
                            <div class="card-info">
                                <span>Mirinda Pineapple</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>

                        <!-- Mirinda Apple -->
                        <div class="card" data-flavor="mirinda_apple" onclick="selectFlavor('mirinda_apple')">
                            <span class="card-tag">330ML CAN</span>
                            <img src="assets/mirinda_apple.jpg" style="mix-blend-mode: multiply; filter: brightness(1.2);" alt="Mirinda Apple Can">
                            <div class="card-info">
                                <span>Mirinda Apple</span>
                                <span>UGX 3,000</span>
                            </div>
                        </div>
                    </div>;

html = html.replace(/<div class="carousel-cards-wrapper" id="carouselWrapper">[\s\S]*?<\/div>\s*<\/div>\s*<div class="carousel-nav">/, carousel + '\n\n                    </div>\n\n                    <div class="carousel-nav">');

// Add styles for new berries and fixes
const styles = 
        .berry {
            position: absolute;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
            pointer-events: none;
        }
        .berry model-viewer {
            width: 100%;
            height: 100%;
        }
;
html = html.replace('</style>', styles + '\n</style>');

fs.writeFileSync('index.html', html);
