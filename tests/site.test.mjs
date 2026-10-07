import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('built page contains the verified portfolio projects', () => {
  for (const name of ['PLNK', 'Recipe Hound', 'Verdant Ledger', 'TapTapCount', 'howsigned']) {
    assert.ok(html.includes(name), `missing project: ${name}`);
  }
  assert.match(html, /id="work-title">Built solo\./);
  assert.match(html, /Thoughtful apps and games, from arcade runs to recipe imports\./);
  assert.doesNotMatch(html, /APPS &amp; PROJECTS|A few things I’ve made/);
  assert.doesNotMatch(html, /PLNK · 30 DROPS/);
  const projectList = html.slice(html.indexOf('id="work"'));
  const projectOrder = ['PLNK', 'Recipe Hound', 'Verdant Ledger', 'TapTapCount'].map((name) => projectList.indexOf(name));
  assert.deepEqual(projectOrder, [...projectOrder].sort((a, b) => a - b), 'PLNK leads the project list');
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
  assert.ok(html.includes('data-gem-downloads-api="https://rubygems.org/api/v1/gems/howsigned.json"'));
  assert.ok(html.includes('total downloads on RubyGems'));
});

test('the site has no guessed email address or private repository links', () => {
  assert.doesNotMatch(html, /mailto:/);
  assert.doesNotMatch(html, /github\.com\/macdoum1\/(?:PLNK|TapTapCount|VerdantLedger|Recipe-Hound)/i);
});

test('the page uses its always-dark palette and does not overplay location', () => {
  assert.match(html, /name="theme-color" content="#0c1421"/);
  assert.match(html, /I build iOS apps, small games, and developer tools\./);
  assert.doesNotMatch(html, /New Jersey/);
  assert.doesNotMatch(html, /Independent developer/);
});

test('navigation points to useful sections and omits the future-work placeholder', () => {
  assert.match(html, /href="#work">Apps &amp; Games<\/a>/);
  assert.match(html, /href="#open-source">Open Source<\/a>/);
  assert.match(html, /href="#elsewhere">Elsewhere<\/a>/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/mjmacdougall\/"[^>]*>LinkedIn/);
  assert.match(html, /href="https:\/\/github\.com\/macdoum1"[^>]*>GitHub/);
  assert.doesNotMatch(html, /01—04/);
  assert.doesNotMatch(html, /01 \/ IN MOTION/);
  assert.doesNotMatch(html, /01 \/ 01/);
  assert.doesNotMatch(html, /More worlds to explore|THE NEXT THING/);
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
