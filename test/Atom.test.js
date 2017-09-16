/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Atom = require('../src/entities/Atom.js');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');

describe('Atom', function () {
  it('should return nothing if the raw input is not valid', function () {
    Helpers.hook(Verbose, 'log');

    const entity = new Atom({});
    assert.deepEqual(entity.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should parse the basic information', function () {
    const entity = new Atom({
      annotations: {
        atom: 'Test-Component',
        description: 'A test description',
        markup: '...',
        script: '....',
      },
      element: {
        selector: '.test',
      },
    });

    assert.deepEqual(entity.getFields(), {
      deprecated: false,
      description: 'A test description',
      descriptor: '.test',
      file: null,
      hash: '47edcec9fa48df43335b12fc0e3e1cc9a4709bf1',
      markup: '...',
      modifiers: [],
      namespace: null,
      location: 'atoms.html',
      name: 'Test-Component',
      script: '....',
      section: 'Atoms > Other',
      type: 'atom',
    });
  });

  /********************************************************/

  it('should mark the atom as deprecated', function () {
    const entity = new Atom({
      annotations: {
        atom: 'Test-Component',
        deprecated: true,
        description: 'A test description',
        markup: '...',
        script: '...',
      },
      element: {
        selector: '.test',
      },
    });

    assert.strictEqual(entity.getFields().deprecated, true);
  });

  /********************************************************/

  it('should handle namespaces', function () {
    const name = (Math.random() * 1e32).toString(36);
    const entity = new Atom({
      annotations: {
        atom: 'Test-Component',
        description: 'A test description',
        markup: '...',
        namespace: name,
        script: '...',
      },
      element: {
        selector: '.test',
      },
    });

    assert.strictEqual(entity.getFields().namespace, name);
  });
});
