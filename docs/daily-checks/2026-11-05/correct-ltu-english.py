import pathlib,json
S=pathlib.Path(__file__).resolve().parents[3]
p=S/'src/data/i18n/en-overrides.json';d=json.loads(p.read_text(encoding='utf-8-sig'))
d.update({
 '聯合新聞網':'United Daily News',
 '媒體來源：聯合新聞網':'Media source: United Daily News',
 'LTU · 升學成果':'LTU · University admission outcomes',
 'LTU · OSSD雙聯學制':'LTU · OSSD dual diploma programme',
 '國際競爭力新典範 LTU OSSD台加高中雙聯學制':'A new model for international education: the LTU Taiwan–Canada OSSD dual diploma programme',
 '僑泰高中雙語班傳捷報！':'Chiao Tai bilingual students celebrate university offers',
 '僑泰高中雙語班傳捷報！5學子前進世界百大名校 打破校史紀錄':'Five Chiao Tai bilingual students receive offers from global top-100 universities, setting a school record'
})
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
