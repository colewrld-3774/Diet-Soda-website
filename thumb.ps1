Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile((Resolve-Path "assets/green_base.jpg").Path)
$outPath = "assets/green_base_thumb.png"
$thumb = $img.GetThumbnailImage(256, 256, $null, [IntPtr]::Zero)
$thumb.Save((Join-Path (Get-Location).Path $outPath), [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$thumb.Dispose()
