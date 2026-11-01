import pathlib,subprocess,hashlib,json
S=pathlib.Path.cwd();R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019');E=S/'docs/daily-checks/2026-11-01'
diff=[]
for rel in subprocess.check_output(['git','ls-files','-z'],cwd=S).decode().split('\0'):
 if not rel:continue
 a=S/rel;b=R/rel
 if not a.is_file() or not b.is_file():continue
 x=hashlib.sha256(a.read_bytes()).hexdigest();y=hashlib.sha256(b.read_bytes()).hexdigest()
 if x!=y:diff.append(dict(path=rel,sourceSha=x,runtimeSha=y))
(E/'runtime-conflict-review.json').write_text(json.dumps(diff,ensure_ascii=False,indent=2),encoding='utf8')
print('\n'.join(x['path'] for x in diff))
