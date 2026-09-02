Add-Type -AssemblyName System.Drawing
$images = @('assets/stoney_can_gen.jpg', 'assets/mirinda_pineapple.jpg', 'assets/mirinda_apple.jpg')

foreach ($imgPath in $images) {
    if (Test-Path $imgPath) {
        $bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path $imgPath).Path)
        
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            for ($y = 0; $y -lt $bmp.Height; $y++) {
                $pixel = $bmp.GetPixel($x, $y)
                if ($pixel.R -gt 230 -and $pixel.G -gt 230 -and $pixel.B -gt 230) {
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
                }
            }
        }
        
        $outPath = $imgPath.Replace('.jpg', '.png')
        $bmp.Save((Join-Path (Get-Location).Path $outPath), [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        Write-Host "Processed $outPath"
    }
}
