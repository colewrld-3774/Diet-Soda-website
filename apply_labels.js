const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGenerateTexture = 
        async function generateTexture(theme) {
            return new Promise((resolve) => {
                // If there's no flat label provided, fallback to standard gradient
                if (!theme.flatLabel) {
                    const canvas = document.createElement('canvas');
                    canvas.width = 2048;
                    canvas.height = 2048;
                    const ctx = canvas.getContext('2d');
                    const grad = ctx.createLinearGradient(0, 0, 0, 2048);
                    grad.addColorStop(0, theme.inner);
                    grad.addColorStop(0.5, theme.outer);
                    grad.addColorStop(1, theme.inner);
                    ctx.fillStyle = grad;
                    ctx.fillRect(0, 0, 2048, 2048);
                    resolve(canvas.toDataURL('image/png'));
                    return;
                }

                // If user provides a flat label, map it perfectly to the 3D UVs
                const canvas = document.createElement('canvas');
                canvas.width = 2048;
                canvas.height = 2048;
                const ctx = canvas.getContext('2d');
                
                const labelImg = new Image();
                labelImg.crossOrigin = "anonymous";
                labelImg.src = theme.flatLabel;
                
                labelImg.onload = () => {
                    ctx.save();
                    ctx.translate(1024, 1024);
                    // The 3D model wraps the texture such that X=0 is the top of the can.
                    // We rotate -90 degrees so the top of the user's label points to X=0.
                    ctx.rotate(-Math.PI / 2);
                    
                    // Draw the user's label to fill the entire unrolled cylinder surface
                    ctx.drawImage(labelImg, -1024, -1024, 2048, 2048);
                    
                    ctx.restore();
                    resolve(canvas.toDataURL('image/png'));
                };
                
                labelImg.onerror = () => {
                    // Fallback if image not found
                    ctx.fillStyle = theme.mid;
                    ctx.fillRect(0, 0, 2048, 2048);
                    resolve(canvas.toDataURL('image/png'));
                };
            });
        }
;

html = html.replace(/async function generateTexture\(theme\) \{[\s\S]*?return new Promise\(\(resolve\) => \{[\s\S]*?\}\);\n        \}/, newGenerateTexture.trim());

// Add flatLabel properties to themes
html = html.replace(/modelTexture: 'stoney',/, "modelTexture: 'stoney',\n                flatLabel: 'assets/stoney_label.png',");
html = html.replace(/modelTexture: 'mirinda_pine',/, "modelTexture: 'mirinda_pine',\n                flatLabel: 'assets/mirinda_pine_label.png',");
html = html.replace(/modelTexture: 'mirinda_apple',/, "modelTexture: 'mirinda_apple',\n                flatLabel: 'assets/mirinda_apple_label.png',");
html = html.replace(/modelTexture: 'dew',/, "modelTexture: 'dew',\n                flatLabel: 'assets/dew_label.png',");

fs.writeFileSync('index.html', html);
