import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('built page contains the verified portfolio projects', () => {
  for (const name of ['PLNK', 'Recipe Hound', 'Verdant Ledger', 'TapTapCount', 'howsigned']) {
    assert.ok(html.includes(name), `missing project: ${name}`);
  }
});

test('built page links to the requested public destinations', () => {
  for (const href of [
    'https://apps.apple.com/us/app/plnk-pachinko-challenge/id1047962614',
    'https://apps.apple.com/us/app/recipe-hound/id6760431706',
    'https://apps.apple.com/us/app/verdant-ledger/id6759935576',
    'https://apps.apple.com/us/app/taptapcount/id981734553',
    'https://github.com/macdoum1/howsigned',
    'https://rubygems.org/gems/howsigned',
    'https://makerworld.com/en/@Applemilk',
    'https://michaelmacdougallphotography.mypixieset.com',
  ]) {
    assert.ok(html.includes(href), `missing destination: ${href}`);
  }
});

test('the site has no guessed email address or private repository links', () => {
  assert.doesNotMatch(html, /mailto:/);
  assert.doesNotMatch(html, /github\.com\/macdoum1\/(?:PLNK|TapTapCount|VerdantLedger|Recipe-Hound)/i);
});

test('the page uses its always-dark palette and the corrected location', () => {
  assert.match(html, /name="theme-color" content="#0c1421"/);
  assert.match(html, /Independent developer · New Jersey/);
  assert.doesNotMatch(html, /Independent developer · New York/);
});

test('the stylesheet uses Hamilton blue accents instead of green', async () => {
  const stylesDirectory = new URL('../dist/_astro/', import.meta.url);
  const cssFile = (await readdir(stylesDirectory)).find((file) => file.endsWith('.css'));
  assert.ok(cssFile, 'built stylesheet exists');
  const css = await readFile(new URL(cssFile, stylesDirectory), 'utf8');
  assert.match(css, /--color-hamilton-blue:\s*#002f86/);
  assert.match(css, /--color-blue-bright:\s*#00a0df/);
  assert.doesNotMatch(css, /--color-green|#c8ee70/);
});
