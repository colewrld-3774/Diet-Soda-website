const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cssToAdd = 
        .card model-viewer {
            width: 130px;
            height: 250px;
            margin-top: -7.5rem;
            filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            display: block;
            pointer-events: none;
            --poster-color: transparent;
        }
        .card:hover model-viewer {
            transform: translateY(-28px) rotate(-12deg) scale(1.15) !important;
        }
;

html = html.replace('.card img.square-can {', cssToAdd + '\n        .card img.square-can {');

const carouselModelViewer = (theme) =>                             <model-viewer class="carousel-3d" data-theme="" src="https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/deit_soda2.glb" environment-image="neutral" exposure="1.5" interaction-prompt="none" camera-orbit="-20deg 85deg 105%" shadow-intensity="0" disable-zoom disable-pan></model-viewer>;

html = html.replace(/<img src="assets\/stoney_can_gen.png" class="square-can" alt="Stoney Tangawizi Can">/, carouselModelViewer('stoney'));
html = html.replace(/<img src="assets\/mirinda_pineapple.png" class="square-can" alt="Mirinda Pineapple Can">/, carouselModelViewer('mirinda_pine'));
html = html.replace(/<img src="assets\/mirinda_apple.png" class="square-can" alt="Mirinda Apple Can">/, carouselModelViewer('mirinda_apple'));
html = html.replace(/<img src="https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/a\/a6\/Mountain_Dew_can.png\/320px-Mountain_Dew_can.png" alt="Mountain Dew Can">/, carouselModelViewer('dew'));

const jsToAdd = 
        document.querySelectorAll('.carousel-3d').forEach((mv) => {
            const themeKey = mv.dataset.theme;
            const theme = flavorThemes[themeKey];
            mv.addEventListener('load', async () => {
                const texDataUrl = generateTexture(theme);
                const tex = await mv.createTexture(texDataUrl);
                if (mv.model && tex) {
                    mv.model.materials.forEach(mat => {
                        if (mat.pbrMetallicRoughness.baseColorTexture) {
                            mat.pbrMetallicRoughness.baseColorTexture.setTexture(tex);
                        }
                    });
                }
            });
        });
;

html = html.replace(/\/\/ Initial load/, jsToAdd + '\n        // Initial load');

fs.writeFileSync('index.html', html);
