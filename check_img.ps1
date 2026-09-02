Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile((Resolve-Path "assets/green_base.jpg").Path)
Write-Host "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
