/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Color = require('../src/entities/Color.js');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');

describe('Color', function () {
  it('should return nothing if the raw input is not valid', function () {
    Helpers.hook(Verbose, 'log');

    const entity = new Color({});
    assert.deepEqual(entity.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should transform raw input data to a color entity', function () {
    const entity = new Color({
      annotations: {
        color: true,
        description: 'Testcolor',
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00',
      },
    });

    assert.deepEqual(entity.getFields(), {
      deprecated: false,
      description: 'Testcolor',
      descriptor: '$testcolor',
      file: null,
      hash: '65edaeaf18d2ba3b22fd90b4526e155453ce0220',
      location: 'nuclides.html',
      markup: null,
      modifiers: [],
      name: '$testcolor',
      namespace: null,
      script: false,
      section: 'Nuclides > Colors > Other',
      sort: 65280,
      table: false,
      type: 'color',
      value: '#00FF00',
      values: {
        hex: '#00FF00',
        rgba: 'rgba(0, 255, 0, 1)',
        darker: '#00E600',
        contrast: null,
      },
    });
  });

  /********************************************************/

  it('should transform raw input data with !default to a color entity', function () {
    const entity = new Color({
      annotations: {
        color: true,
        description: 'Default Testcolor',
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00 !default',
      },
    });

    assert.equal(entity.getFields().values.hex, '#00FF00');
  });

  /********************************************************/

  it('should set a single-line color description as main description', function () {
    const entity = new Color({
      annotations: {
        color: 'Testcolor',
        deprecated: true,
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00',
      },
    });

    assert.deepEqual(entity.getFields(), {
      deprecated: true,
      description: 'Testcolor',
      descriptor: '$testcolor',
      file: null,
      hash: '4d6d4c012b41544bcdc390b6f5a9ebe6e3a8ad15',
      location: 'nuclides.html',
      markup: null,
      modifiers: [],
      name: '$testcolor',
      namespace: null,
      script: false,
      section: 'Nuclides > Colors > Other',
      table: false,
      type: 'color',
      sort: 65280,
      value: '#00FF00',
      values: {
        hex: '#00FF00',
        rgba: 'rgba(0, 255, 0, 1)',
        darker: '#00E600',
        contrast: null,
      },
    });
  });

  /********************************************************/

  it('should not handle namespaces', function () {
    const name = (Math.random() * 1e32).toString(36);
    const entity = new Color({
      annotations: {
        color: 'Testcolor',
        namespace: name,
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00',
      },
    });

    assert.strictEqual(entity.getFields().namespace, undefined);
  });

  /********************************************************/

  it('should handle constrast color', function () {
    const contrast = '#123456';
    const entity = new Color({
      annotations: {
        color: 'Testcolor',
        contrast: contrast,
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00',
      },
    });

    assert.strictEqual(entity.getFields().values.contrast, contrast);
  });
});
