Add-Type -AssemblyName System.Drawing
$rows=Get-Content 'deliveries/vlog-promotion-2026-11-13/posts.json' -Raw | ConvertFrom-Json
$logo=[Drawing.Image]::FromFile('C:/Users/User/journal-20261110/.sites-checkout/editorial/brand/ltu-study-abroad-journal-logo-v1.png')
foreach($row in $rows){$art=[Drawing.Image]::FromFile($row.art);$bmp=[Drawing.Bitmap]::new(1080,1080);$g=[Drawing.Graphics]::FromImage($bmp);$g.Clear([Drawing.ColorTranslator]::FromHtml('#f5f4ee'));$g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;$g.TextRenderingHint=[Drawing.Text.TextRenderingHint]::AntiAliasGridFit;$g.DrawImage($art,0,0,1080,720);$g.FillRectangle([Drawing.Brushes]::White,28,28,328,112);$g.DrawImage($logo,37,37,310,[int](310*$logo.Height/$logo.Width));$ink=[Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#254b68'));$muted=[Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#547080'));$tag=[Drawing.Font]::new('Microsoft JhengHei',23,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel);$font=[Drawing.Font]::new('PMingLiU',55,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel);$small=[Drawing.Font]::new('Microsoft JhengHei',22,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel);$g.DrawString($row.tag,$tag,$muted,44,744);for($i=0;$i -lt 2;$i++){$g.DrawString($row.headline[$i],$font,$ink,44,(790+$i*76))};$g.DrawString('看官方原片與導讀 → globalednews.com/vlog/',$small,$ink,44,969);$g.DrawString($row.disclosure,$small,$muted,44,1020);$bmp.Save($row.image,[Drawing.Imaging.ImageFormat]::Png);$art.Dispose();$g.Dispose();$bmp.Dispose();$font.Dispose();$small.Dispose();$tag.Dispose();$ink.Dispose();$muted.Dispose()};$logo.Dispose()










