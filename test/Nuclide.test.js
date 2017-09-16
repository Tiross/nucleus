/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Nuclide = require('../src/entities/Nuclide.js');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');

describe('Nuclide', function () {
  it('should return nothing if the raw input is not valid', function () {
    Helpers.hook(Verbose, 'log');

    const entity = new Nuclide({});
    assert.deepEqual(entity.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should parse the basic information', function () {
    const entity = new Nuclide({
      annotations: {
        description: 'A test description',
        nuclide: 'Test-Component',
      },
      element: {
        selector: '$foo',
        value: 'bar',
      },
    });

    assert.deepEqual(entity.getFields(), {
      deprecated: false,
      description: 'A test description',
      descriptor: '$foo',
      file: null,
      hash: 'd3608583f67c4a02a72d975b9b1add4bc4bc42e2',
      location: 'nuclides.html',
      modifiers: [],
      markup: null,
      name: '$foo',
      namespace: undefined,
      script: false,
      section: 'Nuclides > Other',
      type: 'nuclide',
      value: 'bar',
    });
  });

  /********************************************************/

  it('should mark the nuclide as deprecated', function () {
    const entity = new Nuclide({
      annotations: {
        deprecated: true,
        description: 'A test description',
        nuclide: 'Test-Component',
      },
      element: {
        selector: '$foo',
        value: 'bar',
      },
    });

    assert.strictEqual(entity.getFields().deprecated, true);
  });

  /********************************************************/

  it('should not handle namespaces', function () {
    const name = (Math.random() * 1e32).toString(36);
    const entity = new Nuclide({
      annotations: {
        deprecated: true,
        description: 'A test description',
        namespace: name,
        nuclide: 'Test-Component',
      },
      element: {
        selector: '$foo',
        value: 'bar',
      },
    });

    assert.strictEqual(entity.getFields().namespace, undefined);
  });
});
