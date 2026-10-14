import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const script = await readFile(new URL('../wus-korean-bbq-editorial/app.js', import.meta.url), 'utf8');
const home = await readFile(new URL('../wus-korean-bbq-editorial/index.html', import.meta.url), 'utf8');
const menu = await readFile(new URL('../wus-korean-bbq-editorial/menu.html', import.meta.url), 'utf8');
const styles = await readFile(new URL('../wus-korean-bbq-editorial/styles.css', import.meta.url), 'utf8');

function runAt({ y, reduce = false }) {
  const nav = {
    classList: {
      values: new Set(),
      toggle(name, enabled) {
        if (enabled) this.values.add(name);
        else this.values.delete(name);
      },
      contains(name) { return this.values.has(name); }
    }
  };
  const window = {
    pageYOffset: y,
    innerHeight: 900,
    matchMedia: () => ({ matches: reduce }),
    addEventListener() {},
  };
  const document = {
    getElementById: () => nav,
    querySelectorAll: () => [],
  };
  vm.runInNewContext(script, {
    window,
    document,
    requestAnimationFrame: callback => callback(),
    IntersectionObserver: undefined,
  });
  return nav.classList.contains('is-solid');
}

assert.equal(runAt({ y: 0 }), false, 'the nav remains transparent at the top of the hero');
assert.equal(runAt({ y: 1 }), true, 'the nav becomes solid immediately after scrolling');
assert.equal(runAt({ y: 1, reduce: true }), true, 'reduced motion does not disable the solid nav state');

assert.match(styles, /\.menu-hero\{text-align:center;padding:clamp\(2\.5rem,5vw,4rem\)/,
  'the menu title area stays compact instead of consuming most of the first screen');
assert.match(styles, /\.menu-wrap\{max-width:1100px;margin-inline:auto;padding:clamp\(2rem,4vw,3\.5rem\)/,
  'the first menu section begins close to its category navigation');

for (const [page, source] of [['home', home], ['menu', menu]]) {
  for (const item of ['Menu', 'About', 'Visit']) {
    assert.match(source, new RegExp(`>${item}<`), `${page} keeps the same ${item} navigation item`);
  }
}
assert.doesNotMatch(home, />Experience</, 'the navigation does not introduce an Experience tab');
assert.match(home, /Korean barbecue,<br><em>at your table\.<\/em>/,
  'the hero states the actual dining experience instead of relying on a generic luxury claim');
for (const [page, source] of [['home', home], ['menu', menu]]) {
  assert.match(source, /Noto\+Serif\+KR/, `${page} loads the restaurant-specific display typeface`);
  assert.match(source, /assets\/logo\.png/, `${page} uses Wu's own logo in the header`);
}
assert.match(styles, /--walnut:#2C1C14/, 'the visual palette includes the restaurant’s dark wood tone');
