const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGenerateTexture = 
        async function generateTexture(theme) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                canvas.width = 2048;
                canvas.height = 2048;
                const ctx = canvas.getContext('2d');
                
                // Draw a shiny metallic gradient
                const grad = ctx.createLinearGradient(0, 0, 0, 2048);
                grad.addColorStop(0, theme.inner);
                grad.addColorStop(0.5, theme.outer);
                grad.addColorStop(1, theme.inner);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 2048, 2048);

                const stickerImg = new Image();
                stickerImg.src = theme.thumb;
                stickerImg.onload = () => {
                    ctx.save();
                    ctx.translate(1024, 1024);
                    // Rotate -90 deg so top of sticker points to X=0 (top of can)
                    ctx.rotate(-Math.PI / 2);
                    
                    // The sticker is a square PNG of the can. 
                    // Draw it large in the center of the front face.
                    const sw = 1400;
                    const sh = 1400;
                    ctx.drawImage(stickerImg, -sw/2, -sh/2 - 100, sw, sh);
                    
                    ctx.restore();
                    resolve(canvas.toDataURL('image/png'));
                };
                stickerImg.onerror = () => {
                    resolve(canvas.toDataURL('image/png'));
                };
            });
        }
;

html = html.replace(/function generateTexture\(theme\) \{[\s\S]*?return canvas\.toDataURL\('image\/png'\);\n        \}/, newGenerateTexture.trim());
fs.writeFileSync('index.html', html);
