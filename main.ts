// news-image-20261123 entry: copies the committed front-page image to /output/entry.png.
//
// The rules allow the simplest program to copy an image the repository holds: frontpage.html is
// the source of the page (hand-laid in this repository), entry.png is the 1024x1024 PNG rendered
// from it, and this program hands that exact file in. It reads only its own repository, uses no
// network, and writes identical bytes on every run: copyFileSync is deterministic.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(here, 'entry.png');

if (!existsSync(source)) {
  process.stderr.write('news image: entry.png is missing from the repository\n');
  process.exit(2);
}

mkdirSync(out, { recursive: true });
copyFileSync(source, join(out, 'entry.png'));
process.stdout.write(`news image: wrote ${join(out, 'entry.png')}\n`);