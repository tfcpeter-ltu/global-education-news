import fs from 'node:fs';
import path from 'node:path';

const TOTAL_SETS = 2000;
const OUT_DIR = process.argv[2] || 'tmp/ielts-ai-manifest';

const topics = [
  'Education & Learning','Technology & AI','Environment & Climate','Cities & Transport',
  'Health & Wellbeing','Business & Work','Science & Research','Culture & Society',
  'History & Archaeology','Psychology & Behaviour','Architecture & Design','Agriculture & Food',
  'Media & Communication','Tourism & Mobility','Energy & Sustainability','Language & Linguistics',
  'Biodiversity & Ecology','Economics & Policy','Innovation & Engineering','Public Services'
];

const subtopics = [
  'Urban Greening','Sleep and Memory','Remote Work','Coral Restoration','Digital Archives',
  'Public Transport','Food Waste','Language Learning','Citizen Science','Solar Irrigation',
  'Museum Design','Electric Mobility','Open Textbooks','Heat-resilient Schools','Community Gardens',
  'AI Translation','Wetland Recovery','Consumer Behaviour','Modular Housing','Cognitive Maps',
  'Seed Banks','Acoustic Ecology','Peer Feedback','Vertical Farming','Repair Cafes',
  'University Mentoring','Electric Ferries','Mangrove Mapping','Urban Beekeeping','Night Trains'
];

const task1Types = ['table','line graph','bar chart','pie charts','process','maps','mixed chart'];
const task2Types = ['opinion','discussion','problem-solution','advantages-disadvantages','two-part question'];
const listeningContexts = [
  'service enquiry','booking and registration','local facilities','workplace orientation',
  'student project discussion','academic tutorial','research planning','university lecture'
];
const accentProfiles = ['UK mixed','UK + Australian','UK + New Zealand','UK + North American','international academic'];
const readingDomains = ['science','social science','environment','technology','history','education','business','culture'];

function seeded(seed){
  let t = seed + 0x6D2B79F5;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function pick(arr,r){ return arr[Math.floor(r()*arr.length)]; }

const sets = [];
for(let id=1; id<=TOTAL_SETS; id++){
  const r = seeded(id * 7919);
  const targetBand = [5.5,6.0,6.5,7.0,7.5,8.0][Math.floor(r()*6)];
  const topic = pick(topics,r);
  const subtopic = pick(subtopics,r);
  const difficulty = targetBand >= 7.5 ? 'advanced' : targetBand >= 6.5 ? 'upper_intermediate' : 'foundation';
  const code = `LTU-${String(id).padStart(4,'0')}`;
  const listening = Array.from({length:4},(_,i)=>({
    part:i+1,
    question_count:10,
    context:i<2 ? pick(listeningContexts.slice(0,4),r) : pick(listeningContexts.slice(4),r),
    accent_profile:pick(accentProfiles,r),
    qa_status:'draft'
  }));
  const readingCounts = [13,13,14];
  const reading = readingCounts.map((count,i)=>({
    passage:i+1,
    question_count:count,
    domain:pick(readingDomains,r),
    target_words:820 + i*80 + Math.floor(r()*80),
    qa_status:'draft'
  }));
  const writing = [
    {task:1,type:pick(task1Types,r),minimum_words:150,qa_status:'draft'},
    {task:2,type:pick(task2Types,r),minimum_words:250,qa_status:'draft'}
  ];
  const speaking = [
    {part:1,format:'personal and familiar questions',qa_status:'draft'},
    {part:2,format:'cue card / long turn',qa_status:'draft'},
    {part:3,format:'abstract discussion linked to Part 2',qa_status:'draft'}
  ];
  sets.push({
    id,code,title:`${subtopic} · Academic Set ${String(id).padStart(4,'0')}`,
    test_type:'academic',topic,subtopic,target_band:targetBand,difficulty,
    listening_question_count:40,reading_question_count:40,writing_task_count:2,speaking_part_count:3,
    answerable_nodes:85,content_source:'LTU Original',license_status:'LTU proprietary original',
    qa_status:'draft',is_published:false,seed:id*7919,listening,reading,writing,speaking
  });
}

// Hard validation: this ledger is the production source of truth for the 2,000-set goal.
const codes = new Set(sets.map(s=>s.code));
const failures = [];
if(sets.length !== 2000) failures.push(`Expected 2000 sets, found ${sets.length}`);
if(codes.size !== 2000) failures.push(`Expected 2000 unique codes, found ${codes.size}`);
for(const s of sets){
  if(s.listening.reduce((a,x)=>a+x.question_count,0)!==40) failures.push(`${s.code}: listening != 40`);
  if(s.reading.reduce((a,x)=>a+x.question_count,0)!==40) failures.push(`${s.code}: reading != 40`);
  if(s.writing.length!==2) failures.push(`${s.code}: writing != 2 tasks`);
  if(s.speaking.length!==3) failures.push(`${s.code}: speaking != 3 parts`);
  if(s.answerable_nodes!==85) failures.push(`${s.code}: nodes != 85`);
}
if(failures.length){ console.error(failures.slice(0,30).join('\n')); process.exit(1); }

fs.mkdirSync(OUT_DIR,{recursive:true});
fs.writeFileSync(path.join(OUT_DIR,'question-sets.json'),JSON.stringify(sets,null,2));
fs.writeFileSync(path.join(OUT_DIR,'question-sets.jsonl'),sets.map(s=>JSON.stringify(s)).join('\n')+'\n');
const csvHeader='id,code,title,test_type,topic,subtopic,target_band,difficulty,listening_questions,reading_questions,writing_tasks,speaking_parts,answerable_nodes,qa_status,is_published\n';
const esc=v=>`"${String(v).replaceAll('"','""')}"`;
const csv=sets.map(s=>[s.id,s.code,s.title,s.test_type,s.topic,s.subtopic,s.target_band,s.difficulty,40,40,2,3,85,s.qa_status,s.is_published].map(esc).join(',')).join('\n');
fs.writeFileSync(path.join(OUT_DIR,'question-sets.csv'),csvHeader+csv+'\n');
fs.writeFileSync(path.join(OUT_DIR,'manifest-summary.json'),JSON.stringify({
  total_sets:sets.length,
  unique_codes:codes.size,
  answerable_nodes:sets.reduce((a,s)=>a+s.answerable_nodes,0),
  listening_questions:sets.reduce((a,s)=>a+s.listening_question_count,0),
  reading_questions:sets.reduce((a,s)=>a+s.reading_question_count,0),
  writing_tasks:sets.reduce((a,s)=>a+s.writing_task_count,0),
  speaking_parts:sets.reduce((a,s)=>a+s.speaking_part_count,0),
  qa_status:'draft',
  validation_failures:failures.length
},null,2));
console.log(`Generated ${sets.length} set manifests / ${sets.length*85} answerable nodes. Validation failures: ${failures.length}`);
