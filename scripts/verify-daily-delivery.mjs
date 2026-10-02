import fs from 'node:fs';
const date = process.argv[2] || new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Taipei'}).format(new Date());
const reportPath = `docs/daily-reports/${date}.json`;
const fail = message => { console.error(`INCOMPLETE ${date}: ${message}`); process.exitCode=1; };
if (!fs.existsSync(reportPath)) { fail('missing daily report'); }
else {
 const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
 const news=(r.newsPublished||[]).filter(x=>x.url && x.verifiedAt);
 if(new Set(news.map(x=>x.url)).size<3) fail('fewer than 3 verified news URLs');
 const scholarships=(r.scholarshipChecks||[]).filter(x=>x.url && x.verifiedAt && x.eligibleTaiwan===true && x.open===true);
 const todayScholarships=scholarships.filter(x=>{const t=new Date(x.verifiedAt);return Number.isFinite(t.getTime()) && new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(t)===date && x.sources?.length>=2 && x.updateSummary && x.publishedVerifiedAt;});
 if(date >= '2026-09-27') {
  const baseline=new Set(r.scholarshipBaselineSlugs||[]);
  const additions=(r.scholarshipAdditions||[]).filter(x=>{
   const t=new Date(x.verifiedAt);
   return x.isNew===true && x.baselineAbsent===true && x.slug && x.url && x.publishedPath &&
    fs.existsSync(x.publishedPath) && !baseline.has(x.slug) && x.eligibleTaiwan===true && x.open===true &&
    x.sources?.length>=2 && x.publishedVerifiedAt && Number.isFinite(t.getTime()) &&
    new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(t)===date;
  });
  if(new Set(additions.map(x=>x.slug)).size<3 || new Set(additions.map(x=>x.url)).size<3)
   fail('fewer than 3 verified new scholarship additions; updates to existing items do not count');
 } else if(date >= '2026-09-24' ? new Set(todayScholarships.map(x=>x.url)).size<3 : scholarships.length<1) {
  fail('missing required verified scholarship updates (3 daily from 2026-09-24)');
 }
 const peterImportCount=new Set((r.peterImports||[]).filter(x=>x.url&&x.sourceId&&x.verifiedAt).map(x=>x.sourceId)).size;
 const peterNoNewPosts=r.peterReview?.status==='no-new-posts' && r.peterReview?.checkedAt && (r.peterReview?.sourceUrls||[]).length>=1;
 if(peterImportCount<3 && !peterNoNewPosts) fail('fewer than 3 verified distinct Peter imports and no verified no-new-posts review');
 const posts=r.socialPosts||[];
 const requirements = ['news','scholarship','study-abroad'].flatMap(campaign => ['facebook','instagram','threads','linkedin'].map(network => [campaign,network]));
 if(date >= '2026-09-16') requirements.push(...['threads','instagram','linkedin'].map(network => ['taiwan-universities',network]));
 for(const [campaign,network] of requirements) {
  const matches=posts.filter(x=>x.campaign===campaign&&x.network===network&&x.status==='PUBLISHED'&&x.id&&x.publicUrl&&x.verifiedAt);
  if(matches.length!==1) fail(`${campaign}/${network}: expected one verified published post, got ${matches.length}`);
  if(date >= '2026-10-03' && matches.length===1) {
   const post=matches[0];
   if(!(Number(post.imageCount)>=1) || post.mediaStatus!=='VERIFIED' || !post.mediaVerifiedAt)
    fail(`${campaign}/${network}: published post is missing verified visible image evidence`);
  }
 }
 if(!r.deployment?.commit || r.deployment.status!=='success' || !r.deployment.verifiedAt) fail('missing deployment evidence');
 if(!r.acceptance?.desktop || !r.acceptance?.mobile || !r.acceptance?.seo || !r.acceptance?.verifiedAt) fail('missing live acceptance evidence');
 if(!process.exitCode) console.log(`COMPLETE ${date}: 3 news, 3 new scholarships, Peter review (${peterImportCount} imports${peterNoNewPosts?', no new source posts':''}), ${requirements.length} social posts and deployment evidence present. Evidence presence does not replace live verification.`);
}
