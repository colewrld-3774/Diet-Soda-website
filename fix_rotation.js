const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGenerateTexture = 
        function generateTexture(theme) {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            
            // Draw a shiny metallic gradient
            const grad = ctx.createLinearGradient(0, 0, 0, 1024);
            grad.addColorStop(0, theme.inner);
            grad.addColorStop(0.5, theme.outer);
            grad.addColorStop(1, theme.inner);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1024, 1024);

            ctx.save();
            ctx.translate(512, 512);
            ctx.rotate(Math.PI / 2);

            ctx.fillStyle = 'white';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            let mainName = theme.name.split(' ')[0];
            ctx.font = '900 130px sans-serif';
            ctx.fillText(mainName, 0, -40);
            
            if (theme.name.split(' ').length > 1) {
                ctx.font = '800 60px sans-serif';
                ctx.fillText(theme.name.split(' ').slice(1).join(' '), 0, 60);
            }
            
            ctx.restore();

            return canvas.toDataURL('image/png');
        }
;

html = html.replace(/function generateTexture\(theme\) \{[\s\S]*?return canvas\.toDataURL\('image\/png'\);\n        \}/, newGenerateTexture.trim());
fs.writeFileSync('index.html', html);
