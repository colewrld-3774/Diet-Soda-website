const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const canvasScript = 
        function generateTexture(theme) {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = theme.mid; // Background color based on theme
            ctx.fillRect(0, 0, 1024, 1024);
            
            // Draw a shiny metallic gradient in the middle
            const grad = ctx.createLinearGradient(0, 0, 0, 1024);
            grad.addColorStop(0, theme.inner);
            grad.addColorStop(0.5, theme.outer);
            grad.addColorStop(1, theme.inner);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1024, 1024);

            // Add branding text
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            
            // Texture maps wrap around, center is at x=512
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Brand Name
            ctx.font = '900 130px sans-serif';
            ctx.fillText(theme.name.split(' ')[0], 512, 450);
            
            // Sub name
            ctx.font = '800 80px sans-serif';
            if (theme.name.split(' ').length > 1) {
                ctx.fillText(theme.name.split(' ').slice(1).join(' '), 512, 580);
            }
            
            // Volume
            ctx.font = '400 40px sans-serif';
            ctx.fillText('330ml ℮', 512, 700);

            // Nutrition side label (fake)
            ctx.font = '30px sans-serif';
            ctx.fillText('NUTRITION FACTS', 150, 400);
            ctx.fillText('Calories 140', 150, 450);
            ctx.fillText('Sugar 39g', 150, 500);

            // Barcode (fake)
            ctx.fillStyle = 'white';
            ctx.fillRect(800, 400, 150, 100);
            ctx.fillStyle = 'black';
            for(let i=0; i<30; i++) {
                ctx.fillRect(805 + i*4.5 + Math.random()*2, 405, Math.random()*3 + 1, 90);
            }

            return canvas.toDataURL('image/png');
        }
;

html = html.replace('// Preload textures & warm up shaders', canvasScript + '\n        // Preload textures & warm up shaders');

const textureLogic = 
            let targetTexture = null;
            if (theme.modelTexture === 'blue') targetTexture = blueTexture;
            else if (theme.modelTexture === 'green') targetTexture = greenTexture;
            else {
                if (!window.textureCache) window.textureCache = {};
                if (!window.textureCache[theme.modelTexture]) {
                    const dataUrl = generateTexture(theme);
                    window.textureCache[theme.modelTexture] = await modelViewer.createTexture(dataUrl);
                }
                targetTexture = window.textureCache[theme.modelTexture];
            }
;

html = html.replace(/let targetTexture = null;[\s\S]*?targetTexture = window.textureCache\[theme.modelTexture\];\n\s*\}/, textureLogic);

fs.writeFileSync('index.html', html);
