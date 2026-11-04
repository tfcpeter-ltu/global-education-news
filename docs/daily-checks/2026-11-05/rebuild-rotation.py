import pathlib, subprocess, shutil, os
S=pathlib.Path(__file__).resolve().parents[3]
R=pathlib.Path(r'C:\Users\User\AppData\Local\Temp\globalednews-security-20261019')
E=pathlib.Path(__file__).parent
N=r'C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
P=r'C:\Users\User\AppData\Local\Programs\Python\Python314\python.exe'
rel='src/pages/index.astro'
old=subprocess.check_output(['git','show','HEAD:'+rel],cwd=S).decode().replace('\r\n','\n')
assert (R/rel).read_text(encoding='utf8')==old, 'Runtime homepage conflict'
shutil.copy2(R/rel,R.parent/'globalednews-20261105-runtime-backup/index-before-reviewed-rotation.astro')
shutil.copy2(S/rel,R/rel)
for args,log in [([N,'node_modules/astro/bin/astro.mjs','build'],'rotation-astro.log'),([N,'scripts/unify-study-navigation.mjs'],'rotation-navigation.log'),([P,'-X','utf8',str(E/'build.py'),'--finish'],'rotation-validation.log')]:
 with (E/log).open('w',encoding='utf8') as f:
  p=subprocess.run(args,cwd=R,stdout=f,stderr=subprocess.STDOUT,env={**os.environ,'PYTHONUTF8':'1'})
 print(log,p.returncode,flush=True)
 if p.returncode:raise SystemExit(p.returncode)
