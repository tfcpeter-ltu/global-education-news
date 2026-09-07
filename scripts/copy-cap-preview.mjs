import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'cap-ai-preview');
const target = path.join(root, 'public', 'cap-ai-preview');

if (!existsSync(source)) {
  console.error('cap-ai-preview source folder not found:', source);
  process.exit(1);
}

await mkdir(path.dirname(target), { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });

console.log('Copied cap-ai-preview to public/cap-ai-preview');
