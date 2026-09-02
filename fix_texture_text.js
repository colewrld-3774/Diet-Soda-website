const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGenerateTexture = 
        async function generateTexture(theme) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                canvas.width = 2048;
                canvas.height = 2048;
                const ctx = canvas.getContext('2d');
                
                // Draw a shiny metallic gradient for the bare aluminum can
                const grad = ctx.createLinearGradient(0, 0, 0, 2048);
                grad.addColorStop(0, theme.inner);
                grad.addColorStop(0.5, theme.outer);
                grad.addColorStop(1, theme.inner);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 2048, 2048);

                ctx.save();
                ctx.translate(1024, 1024);
                ctx.rotate(-Math.PI / 2); // Rotate to wrap horizontally

                // Imprint the text directly onto the texture (no images of cans)
                ctx.fillStyle = 'white';
                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 5;
                
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                // Title
                ctx.font = '900 200px sans-serif';
                ctx.fillText(theme.name.split(' ')[0], 0, -100);
                
                // Subtitle
                if (theme.name.split(' ').length > 1) {
                    ctx.font = '800 100px sans-serif';
                    ctx.fillText(theme.name.split(' ').slice(1).join(' '), 0, 100);
                }

                // Barcode / extra details to look realistic
                ctx.font = '400 60px sans-serif';
                ctx.fillText('330ml ℮', 0, 300);
                ctx.fillText('|||| || |||||| | |||', 0, 450); // Fake barcode
                ctx.font = '300 30px sans-serif';
                ctx.fillText('MADE IN UGANDA', 0, 520);
                
                ctx.restore();
                resolve(canvas.toDataURL('image/png'));
            });
        }
;

html = html.replace(/async function generateTexture\(theme\) \{[\s\S]*?return new Promise\(\(resolve\) => \{[\s\S]*?\}\);\n        \}/, newGenerateTexture.trim());
fs.writeFileSync('index.html', html);
