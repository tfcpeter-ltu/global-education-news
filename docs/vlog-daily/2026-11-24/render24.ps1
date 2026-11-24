Add-Type -AssemblyName System.Drawing
$d='deliveries/vlog-promotion-2026-11-24'
New-Item -ItemType Directory -Path "$d/original-art" -Force|Out-Null
$ids=@('01-rogers-gratitude','02-course-prerequisites')
$names=@('exec-1cde4c13-78c9-40e1-8535-7325f296013a.png','exec-72b49d5f-0341-4a48-adfa-cd7d35f52521.png')
$titles=@(@('出發以前，想起幫助你的人','一分鐘，把感謝寫下來'),@('選課，只看哪一科容易嗎？','先查目標科系的三個要求'))
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
$tag=if($i -eq 0){'留遊學 Vlog / 2002歷史畢業演講'}else{'留遊學 Vlog / OSSD選課'}
$g.DrawString($tag,$s,$ink,44,748)
$g.DrawString($titles[$i][0],$f,$ink,44,800);$g.DrawString($titles[$i][1],$f,$ink,44,876)
$g.DrawString('看影片・收藏提問 → globalednews.com/vlog/',$s,$ink,44,970)
$label=if($i -eq 0){'AI情境插畫・非演講現場'}else{'LTU商業關聯介紹・AI情境插畫'}
$g.DrawString($label,$s,$ink,44,1020);$b.Save("$((Get-Location).Path)/$d/$($ids[$i]).jpg",[Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose();$b.Dispose();$art.Dispose();$f.Dispose();$s.Dispose();$ink.Dispose()
}
$logo.Dispose()
