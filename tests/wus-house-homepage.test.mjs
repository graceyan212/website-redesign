import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Wu\'s House identifies itself as an unaffiliated, non-indexed concept preview', async () => {
  const page = await readFile(new URL('../wus-house/index.html', import.meta.url), 'utf8');

  assert.match(page, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(page, /unaffiliated concept preview/i);
  assert.match(page, /<main>/);
});

test('Wu\'s House provides the homepage journey and source-image credit', async () => {
  const page = await readFile(new URL('../wus-house/index.html', import.meta.url), 'utf8');

  for (const id of ['experience', 'private-hibachi', 'locations']) {
    assert.match(page, new RegExp(`<section[^>]+id="${id}"`));
  }

  assert.match(page, /Bring the(?:<br>)?whole table\./);
  assert.match(page, /Photography sourced from Wu(?:'|&rsquo;)s House/);
});

test('Wu\'s House uses local restaurant-owned images and verified official destinations', async () => {
  const page = await readFile(new URL('../wus-house/index.html', import.meta.url), 'utf8');

  for (const image of ['assets/hero.jpg', 'assets/hibachi.jpg', 'assets/orlandpark.jpg']) {
    assert.match(page, new RegExp(`src="${image}"`));
  }

  assert.match(page, /https:\/\/www\.wushouse\.com\/hibachi\.html/);
  assert.match(page, /https:\/\/www\.orderonlinehub\.com\/wushouseorlandpark/);
});

test('Wu\'s House supplies accessible mobile navigation behavior', async () => {
  const script = await readFile(new URL('../wus-house/app.js', import.meta.url), 'utf8');

  assert.match(script, /menuToggle\.addEventListener\('click'/);
  assert.match(script, /event\.key === 'Escape'/);
  assert.match(script, /header\.classList\.toggle\('is-solid'/);
});

test('Wu\'s House keeps primary navigation available without JavaScript on mobile', async () => {
  const page = await readFile(new URL('../wus-house/index.html', import.meta.url), 'utf8');

  assert.match(page, /<noscript>/);
  assert.match(page, /\.site-nav\{position:static;display:flex!important;flex-wrap:wrap/);
});
