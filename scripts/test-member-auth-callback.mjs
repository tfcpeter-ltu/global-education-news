import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const code=fs.readFileSync('public/study-abroad/study-cloud-sync.js','utf8');
const values=new Map();
const context={
  URLSearchParams,Date,console,setTimeout,clearTimeout,fetch:async()=>{throw new Error('unexpected fetch')},
  location:{hash:'#access_token=test-access&refresh_token=test-refresh&token_type=bearer&expires_in=3600',pathname:'/study-abroad/member.html',search:''},
  history:{replaceState(_state,_title,url){context.cleanedUrl=url}},
  localStorage:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key),length:0,key:()=>null},
  Storage:function(){},document:{querySelector:()=>null},window:{}
};
context.Storage.prototype={setItem(){}};
vm.createContext(context);
vm.runInContext(code,context);
const session=JSON.parse(values.get('studyNavigatorMemberSession'));
assert.equal(session.access_token,'test-access');
assert.equal(session.refresh_token,'test-refresh');
assert.equal(context.cleanedUrl,'/study-abroad/member.html');
assert.equal(context.window.StudyMember.authCallbackAccepted,true);
assert.doesNotMatch(context.cleanedUrl,/access_token|refresh_token/);
console.log('member auth callback checks passed');
