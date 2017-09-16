/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Helpers = require('./helpers');
const Entity = require('../src/entities/Entity.js');
const Verbose = require('../src/Verbose.js');

describe('Entity', function () {

  /********************************************************/

  it('should set a default values as fallback', function () {
    const entity = new Entity({
      annotations: {},
      type: 'nuclide',
    });

    assert.equal(entity.validate(), true);
    assert.equal(entity.getFields().description, '');
    assert.equal(entity.getFields().deprecated, false);
  });

  /********************************************************/

  describe('#getSection', function () {
    const sections = [
      'Section > Subsection',
      ' Section > Subsection ',
      '> Section > Subsection >',
      ' > Section > Subsection> ',
    ];

    sections.forEach(function (section) {
      it('should return the trimmed section value from "' + section + '"', function () {
        const entity = new Entity({
          annotations: {
            section: section,
          },
          type: 'nuclide',
        });

        assert.strictEqual(entity.getSection(), 'Section > Subsection');
      });
    });
  });

  /********************************************************/

  describe('#validate', function () {
    it('should complain if the entity has no annotations', function () {
      const entity = new Entity({});

      Helpers.hook(Verbose, 'log');
      assert.equal(entity.validate(), false);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should complain if the entity has invalid annotations', function () {
      Helpers.hook(Verbose, 'log');

      const entity = new Entity({
        annotations: {
          allowed: true,
        },
        type: 'nuclide',
      });

      // All good
      entity.fillable = ['allowed'];
      assert.equal(entity.validate(), true);
      assert.equal(Helpers.logCalled, 0);

      // Invalid annotation
      entity.fillable = [];
      assert.equal(entity.validate(), false);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should complain if the sections value is malformed', function () {
      const entity = new Entity({
        annotations: {
          section: '> Section > Ok',
        },
        type: 'nuclide',
      });
      let fields = entity.getFields();

      fields.fillable = ['section'];

      // Beginning of the string
      Helpers.hook(Verbose, 'log');
      assert.ok(Helpers.logCalled === 0);
      assert.equal(entity.validate(), true);
      assert.ok(Helpers.logCalled >= 1);

      // End of string
      entity.raw.annotations.section = 'Section > ok >';
      Helpers.hook(Verbose, 'log');
      assert.ok(Helpers.logCalled === 0);
      assert.equal(entity.validate(), true);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should complain if the sections value is not a string', function () {
      const entity = new Entity({
        annotations: {
          section: true,
        },
        type: 'nuclide',
      });

      // Beginning of the string
      Helpers.hook(Verbose, 'log');
      assert.ok(Helpers.logCalled === 0);
      assert.equal(entity.validate(), false);
      assert.ok(Helpers.logCalled >= 1);
    });
  });

  /********************************************************/

  it('should not handle namespaces', function () {
    const name = (Math.random() * 1e32).toString(36);
    const entity = new Entity({
      annotations: {
        namespace: name,
      },
      type: 'nuclide',
    });

    assert.strictEqual(entity.getFields().namespace, undefined);
  });
});
