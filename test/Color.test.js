/* global describe */
/* global it */

'use strict';

var assert = require('assert');
var Color = require('../src/entities/Color.js');
var Helpers = require('./helpers');
var Verbose = require('../src/Verbose.js');

describe('Color', function() {
  it('should return nothing if the raw input is not valid', function() {
    Helpers.hook(Verbose, 'log');

    var c = new Color({});
    assert.deepEqual(c.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should transform raw input data to a color entity', function() {
    var c = new Color({
      annotations: {
        description: 'Testcolor',
        color: true
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00'
      }
    });

    assert.deepEqual(c.getFields(), {
      name: '$testcolor',
      type: 'color',
      section: 'Nuclides > Colors > Other',
      description: 'Testcolor',
      descriptor: '$testcolor',
      hash: '65edaeaf18d2ba3b22fd90b4526e155453ce0220',
      file: null,
      markup: null,
      modifiers: [],
      namespace: null,
      script: false,
      location: 'nuclides.html',
      deprecated: false,
      value: '#00FF00',
      values: {
        hex: '#00FF00',
        rgba: 'rgba(0, 255, 0, 1)',
        darker: '#00E600'
      }
    });
  });

  /********************************************************/

  it('should transform raw input data with !default to a color entity', function() {
    var c = new Color({
      annotations: {
        description: 'Default Testcolor',
        color: true
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00 !default'
      }
    });

    assert.equal(c.getFields().values.hex, '#00FF00');
  });

  /********************************************************/

  it('should set a single-line color description as main description', function() {
    var c = new Color({
      annotations: {
        color: 'Testcolor',
        deprecated: true
      },
      element: {
        prop: '$testcolor',
        value: '#00FF00'
      }
    });
    assert.deepEqual(c.getFields(), {
      name: '$testcolor',
      type: 'color',
      section: 'Nuclides > Colors > Other',
      description: 'Testcolor',
      descriptor: '$testcolor',
      hash: '4d6d4c012b41544bcdc390b6f5a9ebe6e3a8ad15',
      file: null,
      markup: null,
      modifiers: [],
      namespace: null,
      script: false,
      location: 'nuclides.html',
      deprecated: true,
      value: '#00FF00',
      values: {
        hex: '#00FF00',
        rgba: 'rgba(0, 255, 0, 1)',
        darker: '#00E600'
      }
    });
  });
});
