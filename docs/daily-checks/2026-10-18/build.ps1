$ErrorActionPreference='Stop'
$env:PYTHONIOENCODING='utf-8'
$taskPython='C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
node node_modules/astro/astro.js build *> docs/daily-checks/2026-10-18/astro-build.log
if ($LASTEXITCODE -ne 0) { throw 'Astro failed' }
node scripts/unify-study-navigation.mjs
if ($LASTEXITCODE -ne 0) { throw 'Navigation failed' }
node scripts/bilingual-extract-js.mjs
if ($LASTEXITCODE -ne 0) { throw 'Extraction failed' }
& $taskPython scripts/build-bilingual.py
if ($LASTEXITCODE -ne 0) { throw 'Translation failed' }
node scripts/build-social-previews.mjs
if ($LASTEXITCODE -ne 0) { throw 'Photos failed' }
& $taskPython scripts/finalize-search-index.py
if ($LASTEXITCODE -ne 0) { throw 'Index failed' }
& $taskPython scripts/test-search-index.py
if ($LASTEXITCODE -ne 0) { throw 'Search validation failed' }
& $taskPython scripts/test-bilingual.py
if ($LASTEXITCODE -ne 0) { throw 'Bilingual validation failed' }
node scripts/test-facebook-photo-evidence.mjs
if ($LASTEXITCODE -ne 0) { throw 'Facebook validation failed' }

