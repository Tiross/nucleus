/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');
const Mixin = require('../src/entities/Mixin.js');

describe('Mixin', function () {
  it('should return nothing if the raw input is not valid', function () {
    Helpers.hook(Verbose, 'log');

    const entity = new Mixin({});
    assert.deepEqual(entity.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should parse the parameters from the descriptor', function () {
    let entity = new Mixin({
      annotations: {
        description: 'A test description',
        param: [
          'param1 The first parameter',
          'param2 The second description',
        ],
      },
      element: {
        params: 'test ($param1, $param2: true)',
      },
    });

    assert.deepEqual(entity.getParameters(), [
      {
        description: 'The first parameter',
        name: 'param1',
        optional: false,
      },
      {
        description: 'The second description',
        name: 'param2',
        optional: true,
      },
    ]);

    entity = new Mixin({
      annotations: {
        description: 'A test description',
        param: 'param1 The only parameter'
      },
      element: {
        params: 'test ($param1)',
      },
    });

    assert.deepEqual(entity.getParameters(), [{
      description: 'The only parameter',
      name: 'param1',
      optional: false,
    }]);
  });

  /********************************************************/

  it('should not handle namespaces', function () {
    const name = (Math.random() * 1e32).toString(36);
    const entity = new Mixin({
      annotations: {
        description: 'A test description',
        namespace: name,
        param: 'param1 The only parameter',
      },
      element: {
        params: 'test ($param1)',
      },
    });

    assert.strictEqual(entity.getFields().namespace, undefined);
  });
});
