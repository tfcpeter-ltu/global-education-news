Add-Type -AssemblyName System.Drawing
$d='deliveries/vlog-promotion-2026-11-25'
New-Item -ItemType Directory -Path "$d/original-art" -Force|Out-Null
$ids=@('01-auckland-questions','02-eth-campus-notes')
$names=@('exec-3f09f4df-0337-47d3-aecf-0c4cb1946654.png','exec-d838337c-edeb-48c3-b04c-ea1e81f553ae.png')
$titles=@(@('想像留學生活，先聽不同聲音','五位學生，五個觀察起點'),@('看完校園導覽，還想問什麼？','把風景，變成選校問題'))
$logo=[Drawing.Image]::FromFile('C:/Users/User/journal-20261110/.sites-checkout/editorial/brand/ltu-study-abroad-journal-logo-v1.png')
for($i=0;$i -lt 2;$i++){
Copy-Item -LiteralPath ("C:/Users/User/.codex/generated_images/01a1682b-f995-77a3-821b-f50c00373468/"+$names[$i]) -Destination "$d/original-art/$($ids[$i]).png"
$art=[Drawing.Image]::FromFile((Resolve-Path "$d/original-art/$($ids[$i]).png"))
$b=[Drawing.Bitmap]::new(1080,1080);$g=[Drawing.Graphics]::FromImage($b);$g.Clear([Drawing.Color]::Ivory)
$g.InterpolationMode='HighQualityBicubic';$g.TextRenderingHint='AntiAliasGridFit';$g.DrawImage($art,0,0,1080,720)
$g.FillRectangle([Drawing.Brushes]::White,28,28,328,112);$g.DrawImage($logo,37,37,310,[int](310*$logo.Height/$logo.Width))
$ink=[Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#254b68'))
$f=[Drawing.Font]::new('PMingLiU',49,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel)
$s=[Drawing.Font]::new('Microsoft JhengHei',22,[Drawing.FontStyle]::Regular,[Drawing.GraphicsUnit]::Pixel)
$tag=if($i -eq 0){'留遊學 Vlog / 紐西蘭學生故事'}else{'留遊學 Vlog / 瑞士校園探索'}
$g.DrawString($tag,$s,$ink,44,748)
$g.DrawString($titles[$i][0],$f,$ink,44,800);$g.DrawString($titles[$i][1],$f,$ink,44,876)
$g.DrawString('看影片・收藏提問 → globalednews.com/vlog/',$s,$ink,44,970)
$label=if($i -eq 0){'AI情境插畫・非校園實拍'}else{'AI情境插畫・非校園實拍'}
$g.DrawString($label,$s,$ink,44,1020);$b.Save("$((Get-Location).Path)/$d/$($ids[$i]).jpg",[Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose();$b.Dispose();$art.Dispose();$f.Dispose();$s.Dispose();$ink.Dispose()
}
$logo.Dispose()

