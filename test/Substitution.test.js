/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');
const Substitute = require('../src/Substitute');

describe('Substitution', function () {
  it('complains about invalid shortcodes', function () {
    Helpers.hook(Verbose, 'log');
    Substitute.substitute('@{lipsums}');
    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should not break if no markup is present', function () {
    Substitute.substitute();
  });

  /********************************************************/

  it('resolves to image urls', function () {
    const markup = 'Test @{image:300:300}';
    const subs = Substitute.substitute(markup);

    assert.ok(subs.indexOf('Test') === 0);
    assert.ok(subs.indexOf('https://unsplash.it/') !== -1);
  });

  /********************************************************/

  it('resolves dummy text', function () {
    let markup = 'Test @{lipsum:1:words}';
    let subs = Substitute.substitute(markup);

    assert.ok(subs.indexOf('Test') === 0);
    assert.ok(subs.indexOf('{lipsum') === -1);

    markup = 'Test @{lipsum:1:letter}';
    subs = Substitute.substitute(markup);
    assert.ok(subs.indexOf('Test') === 0);
    assert.ok(subs.indexOf('{lipsum') === -1);

    markup = '@{lipsum:1:words}';
    subs = Substitute.substitute(markup);
    assert.ok(subs.split(' ').length === 1);

    markup = '@{lipsum:3:words}';
    subs = Substitute.substitute(markup);
    assert.ok(subs.split(' ').length === 3);
  });
});
