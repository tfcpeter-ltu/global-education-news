Add-Type -AssemblyName System.Drawing
$promoDir='deliveries/vlog-promotion-2026-11-28'
$logo28=[Drawing.Image]::FromFile('C:/Users/User/journal-20261110/.sites-checkout/editorial/brand/ltu-study-abroad-journal-logo-v1.png')
$topics28=@(@('01-three-questions','出國之前，先問自己三件事','想深入的主題','適合的學習方式','需要的家庭支援'),@('02-postgraduate-housing','住宿清單第一格：我能申請嗎？','確認申請對象','比較房型與費用','查看當期申請資訊'))
foreach($topic28 in $topics28){
$bitmap28=[Drawing.Bitmap]::new(1080,1080); $graphic28=[Drawing.Graphics]::FromImage($bitmap28);$graphic28.SmoothingMode='AntiAlias';$graphic28.TextRenderingHint='AntiAliasGridFit';$graphic28.Clear([Drawing.ColorTranslator]::FromHtml('#f7f5ef'))
$ink28=[Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#315875'));$blue28=[Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#e2edf0'));$green28=[Drawing.SolidBrush]::new([Drawing.ColorTranslator]::FromHtml('#e6ebdf'));$pen28=[Drawing.Pen]::new([Drawing.ColorTranslator]::FromHtml('#94a9b4'),3)
$graphic28.DrawImage($logo28,38,30,320,[int](320*$logo28.Height/$logo28.Width));$font28=[Drawing.Font]::new('PMingLiU',47);$small28=[Drawing.Font]::new('Microsoft JhengHei',25);$num28=[Drawing.Font]::new('Georgia',37)
$graphic28.DrawString($topic28[1],$font28,$ink28,45,215)
for($j28=0;$j28 -lt 3;$j28++){$y28=340+$j28*170;$graphic28.FillRectangle($(if($j28%2 -eq 0){$blue28}else{$green28}),65,$y28,950,140);$graphic28.DrawEllipse($pen28,95,($y28+30),75,75);$graphic28.DrawString(($j28+1).ToString(),$num28,$ink28,115,($y28+42));$graphic28.DrawString($topic28[$j28+2],$font28,$ink28,205,($y28+43))}
$graphic28.DrawString('留遊學 Vlog｜給台灣學生與家長的準備筆記',$small28,$ink28,60,900);$graphic28.DrawString('globalednews.com/vlog/',$small28,$ink28,60,955);$graphic28.DrawString('原創概念圖・非校園實拍',$small28,$ink28,60,1000)
$bitmap28.Save((Join-Path (Resolve-Path $promoDir) ($topic28[0]+'.jpg')),[Drawing.Imaging.ImageFormat]::Jpeg);$graphic28.Dispose();$bitmap28.Dispose()
}
$logo28.Dispose()
