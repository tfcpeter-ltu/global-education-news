import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export const advisory = 'GHSA-fc5q-39xc-vjpf';
const expected = {
  '4.0.7': '7e969f637d8f73ca126e657aae2debf82f87ca8c030c647bce8a171ccb53ca74',
  '2.3.2': 'fcc9cde50e3a3f83240736773a459db80840a863e4d42204f055735a343dd161'
};

export function verifyMitigation(root = process.cwd()) {
  // Inspect dependency links, not orphaned packages in pnpm's content store.
  const store = path.join(root, 'node_modules/.pnpm');
  const modules = new Set();
  for (const entry of fs.readdirSync(store, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const target = path.join(store, entry.name, entry.name === 'node_modules' ? 'picomatch' : 'node_modules/picomatch');
    if (fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink()) modules.add(fs.realpathSync(target));
  }
  const direct = path.join(root, 'node_modules/picomatch');
  if (fs.existsSync(direct)) modules.add(fs.realpathSync(direct));
  if (!modules.size) throw Error('No installed picomatch dependency links found; refusing exception');
  const versions = new Set();
  for (const dir of modules) {
    const version = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version;
    const source = fs.readFileSync(path.join(dir, 'lib/parse.js'), 'utf8').replace(/\r\n/g, '\n');
    const hash = createHash('sha256').update(source).digest('hex');
    if (!expected[version] || hash !== expected[version]) throw Error(`Unreviewed or missing picomatch mitigation: ${version} ${hash}`);
    // Time-limit each installed copy: an unmitigated regex must never hang CI.
    const check = spawnSync(process.execPath, ['--input-type=commonjs', '-e', `
      const assert = require('node:assert/strict');
      const pm = require(process.argv[1]);
      const parse = require(process.argv[1] + '/lib/parse.js');
      const patterns = ['+(*)','+(*a)','*(*)','*(*a)','a/+(*a)b','+(a|aa)','+(*(a))','\\\\+(*)'];
      for (const pattern of patterns) for (const options of [{},{fastpaths:false},{maxExtglobRecursion:false}]) {
        for (const run of [() => pm(pattern, options), () => pm.makeRe(pattern, options), () => pm.parse(pattern, options), () => parse.fastpaths(pattern, options)]) {
          assert.throws(run, /GEN_UNSAFE_REPEATED_EXTGLOB/);
        }
      }
      assert.equal(pm('src/**/*.md')('src/pages/a.md'),true);
      assert.equal(pm('src/**/*.md')('src/pages/a.js'),false);
      assert.equal(pm('**/*.{md,astro}')('src/pages/a.astro'),true);
      assert.equal(pm('!(*.test).js')('main.js'),true);
      assert.equal(pm('@(a|b).js')('b.js'),true);
    `, dir], { encoding: 'utf8', timeout: 3000 });
    if (check.status !== 0 || check.error) throw Error(`Mitigation regression failed for ${version}: ${check.error || check.stderr}`);
    versions.add(version);
  }
  return { advisory, versions: [...versions], copies: modules.size, status: 'PATCH_AND_REGRESSIONS_VERIFIED' };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) console.log(verifyMitigation());
