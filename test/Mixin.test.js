/* global describe */
/* global it */

'use strict';

var assert = require('assert');
var Helpers = require('./helpers');
var Verbose = require('../src/Verbose.js');
var Mixin = require('../src/entities/Mixin.js');

describe('Mixin', function() {
  it('should return nothing if the raw input is not valid', function() {
    Helpers.hook(Verbose, 'log');

    var m = new Mixin({});
    assert.deepEqual(m.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should parse the parameters from the descriptor', function() {
    var m = new Mixin({
      element: {
        params: "test ($param1, $param2: true)"
      },
      annotations: {
        description: 'A test description',
        param: [
          'param1 The first parameter',
          'param2 The second description'
        ]
      }
    });

    assert.deepEqual(m.getParameters(), [{
      name: 'param1',
      optional: false,
      description: 'The first parameter'
    }, {
      name: 'param2',
      optional: true,
      description: 'The second description'
    }]);

    m = new Mixin({
      element: {
        params: "test ($param1)"
      },
      annotations: {
        description: 'A test description',
        param: 'param1 The only parameter'
      }
    });

    assert.deepEqual(m.getParameters(), [{
      name: 'param1',
      optional: false,
      description: 'The only parameter'
    }]);
  });

  /********************************************************/

  it('should not handle namespaces', function() {
    const name = (Math.random() * 1e32).toString(36);
    const entity = new Mixin({
      element: {
        params: 'test ($param1)'
      },
      annotations: {
        description: 'A test description',
        param: 'param1 The only parameter',
        namespace: name,
      },
    });

    assert.strictEqual(entity.getFields().namespace, undefined);
  });
});
