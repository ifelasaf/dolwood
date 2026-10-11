const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const folder = mkdtempSync(join(tmpdir(), 'dolwood-analytics-'));
try {
  execFileSync('./node_modules/.bin/tsc', ['lib/analytics.ts', '--target', 'ES2020', '--module', 'commonjs', '--lib', 'ES2020,DOM,DOM.Iterable', '--skipLibCheck', '--strict', '--outDir', folder]);
  const a = require(join(folder, 'analytics.js'));
  assert.equal(a.counterId(''), null);
  assert.equal(a.counterId('0'), null);
  assert.equal(a.counterId('test'), null);
  assert.equal(a.counterId('12345678'), 12345678);
  assert.equal(a.analyticsEnabled('127.0.0.1', 12345678), false);
  assert.equal(a.analyticsEnabled('dolwood.ru', null), false);
  assert.equal(a.contactChannel('https://wa.me/79267174764?text=private'), 'whatsapp');
  assert.equal(a.contactChannel('https://wa.me.example.com/'), undefined);
  assert.equal(a.requestGoal('/dolwood/bukovaya-doska/#request-board'), 'request_board');
  assert.equal(a.requestGoal('/zagotovki-iz-buka/#request-parts'), 'request_parts');
  assert.equal(a.cleanPageUrl('https://dolwood.ru/?utm_source=yandex&email=private&text=secret#request-board'), 'https://dolwood.ru/?utm_source=yandex');
  process.env.NEXT_PUBLIC_YANDEX_METRICA_ID = '12345678';
  const calls = [];
  global.window = { location: { hostname: 'dolwood.ru', pathname: '/bukovaya-doska/' }, ym: (...args) => calls.push(args) };
  class ElementMock {
    constructor(attrs = {}) { this.attrs = attrs; this.dataset = { goal: attrs.goal }; }
    closest(selector) {
      if (selector === 'a,button') return this;
      if (selector === '[data-placement]') return { dataset: { placement: 'request' } };
      if (selector === '[data-product]') return { dataset: { product: 'board' } };
      return null;
    }
    getAttribute(name) { return this.attrs[name]; }
    hasAttribute(name) { return name in this.attrs; }
  }
  global.Element = ElementMock;
  a.handleAnalyticsClick({ target: new ElementMock({ href: 'https://wa.me/79267174764?text=secret', goal: 'request_contact' }), defaultPrevented: false });
  assert.deepEqual(calls.map(c => c[2]), ['contact_whatsapp', 'request_contact']);
  assert.equal(JSON.stringify(calls).includes('secret'), false);
  assert.equal(calls[1][3].product, 'board');
  a.handleAnalyticsClick({ target: new ElementMock({ href: 'mailto:a@b.ru', 'aria-disabled': 'true' }), defaultPrevented: false });
  assert.equal(calls.length, 2);
  a.handleAnalyticsClick({ target: new ElementMock({ href: '#request-board' }), defaultPrevented: false });
  assert.equal(calls.at(-1)[2], 'request_board');
  global.window.location.hostname = 'localhost';
  a.reachGoal('request_start');
  assert.equal(calls.length, 3);
  global.window.location.hostname = 'dolwood.ru';
  global.window.ym = () => { throw Error('blocked'); };
  assert.doesNotThrow(() => a.reachGoal('request_start'));
  console.log('PASS: counter validation, local exclusion, both request paths, contact goals, disabled actions, URL cleaning, no message content, blocked analytics.');
} finally { rmSync(folder, { recursive: true, force: true }); }
