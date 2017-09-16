/* global describe */
/* global it */

'use strict';

var assert = require('assert');
var Helpers = require('./helpers');
var Entity = require('../src/entities/Entity.js');
var Verbose = require('../src/Verbose.js');

describe('Entity', function() {

  /********************************************************/

  it('should set a default values as fallback', function() {
    var e = new Entity({
      type: 'nuclide',
      annotations: {}
    });

    assert.equal(e.validate(), true);
    assert.equal(e.getFields().description, '');
    assert.equal(e.getFields().deprecated, false);
  });

  /********************************************************/

  describe('#getSection', function() {
    const sections = [
      'Section > Subsection',
      ' Section > Subsection ',
      '> Section > Subsection >',
      ' > Section > Subsection> ',
    ];

    sections.forEach(function (section) {
      it('should return the trimmed section value from "' + section + '"', function () {
        var e = new Entity({
          type: 'nuclide',
          annotations: {
            section: section,
          },
        });

        assert.strictEqual(e.getSection(), 'Section > Subsection');
      });
    });
  });

  /********************************************************/

  describe('#validate', function() {
    it('should complain if the entity has no annotations', function() {
      var e = new Entity({});

      Helpers.hook(Verbose, 'log');
      assert.equal(e.validate(), false);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should complain if the entity has invalid annotations', function() {
      Helpers.hook(Verbose, 'log');

      var e = new Entity({
        type: 'nuclide',
        annotations: {
          'allowed': true,
        }
      });

      // All good
      e.fillable = ['allowed'];
      assert.equal(e.validate(), true);
      assert.equal(Helpers.logCalled, 0);

      // Invalid annotation
      e.fillable = [];
      assert.equal(e.validate(), false);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should complain if the sections value is malformed', function() {
      var e = new Entity({
        type: 'nuclide',
        annotations: {
          section: '> Section > Ok'
        }
      });
      var fields = e.getFields();

      fields.fillable = ['section'];

      // Beginning of the string
      Helpers.hook(Verbose, 'log');
      assert.ok(Helpers.logCalled === 0);
      assert.equal(e.validate(), true);
      assert.ok(Helpers.logCalled >= 1);

      // End of string
      e.raw.annotations.section = 'Section > ok >';
      Helpers.hook(Verbose, 'log');
      assert.ok(Helpers.logCalled === 0);
      assert.equal(e.validate(), true);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should complain if the sections value is not a string', function() {
      var e = new Entity({
        type: 'nuclide',
        annotations: {
          section: true,
        },
      });

      // Beginning of the string
      Helpers.hook(Verbose, 'log');
      assert.ok(Helpers.logCalled === 0);
      assert.equal(e.validate(), false);
      assert.ok(Helpers.logCalled >= 1);
    });
  });
});
