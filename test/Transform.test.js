/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');
const Transform = require('../src/Transform.js');

describe('Transform', function () {

  /********************************************************/

  describe('#hasAnnotation', function () {
    it('should return true if the style has the annotation', function () {
      assert.equal(Transform.hasAnnotation('color', {annotations: {color: true}}), true);
    });

    it('should return false if the style does not have the annotation', function () {
      assert.equal(Transform.hasAnnotation('test', {annotations: {color: true}}), false);
    });
  });

  /********************************************************/

  describe('#getStyleType', function () {
    it('should return the type of the style', function () {
      assert.equal(Transform.getStyleType({annotations: {color : true}}), 'color');
      assert.equal(Transform.getStyleType({annotations: {mixin : true}}), 'mixin');
      assert.equal(Transform.getStyleType({annotations: {structure : true}}), 'structure');
      assert.equal(Transform.getStyleType({annotations: {atom : true}}), 'atom');
      assert.equal(Transform.getStyleType({annotations: {nuclide : true}}), 'nuclide');
      assert.equal(Transform.getStyleType({annotations: {molecule : true}}), 'molecule');
    });

    it('should return null if the style has an invalid or no type', function () {
      Helpers.hook(Verbose, 'log');

      const styleType = Transform.getStyleType({
        annotations: {
          whatever : true,
        },
        element: {
          source: {
            start: {
              line:1,
            },
          },
        },
        file: 'Test',
      });

      assert.equal(styleType, null);
      assert.ok(Helpers.logCalled >= 1);
    });

    it('should throw an error if the style has multiple types', function () {
      Helpers.hook(Verbose, 'log');

      const styleType = Transform.getStyleType({
        annotations: {
          color: true,
          nuclide: true,
        },
      });

      assert.equal(styleType, 'nuclide');
      assert.equal(Helpers.logCalled, 2); // Multi-line text
    });
  });

  /********************************************************/

  describe('#sort', function () {
    it('should sort array by name of object inside', function () {
      const tested = [
        {name: 'c'},
        {name: 'a'},
        {name: 'b'},
      ];
      const expected = [
        {name: 'a'},
        {name: 'b'},
        {name: 'c'},
      ];

      assert.deepEqual(Transform.sort(tested), expected);
    });

    it('should sort recursively', function () {
      const tested = {
        nuclide: {
          second: [
            {name: 'cc', sort: 2},
            {name: 'aa', sort: 11},
            {name: 'bb', sort: 1},
          ],
          first: [
            {name: 'x'},
            {name: 'z'},
            {name: 'y'},
          ],
        },
        atom: [
          {name: 'b'},
          {name: 'c'},
          {name: 'a'},
        ],
      };
      const expected = {
        atom: [
          {name: 'a'},
          {name: 'b'},
          {name: 'c'},
        ],
        nuclide: {
          first: [
            {name: 'x'},
            {name: 'y'},
            {name: 'z'},
          ],
          second: [
            {name: 'bb', sort: 1},
            {name: 'cc', sort: 2},
            {name: 'aa', sort: 11},
          ],
        },
      };

      assert.deepEqual(Transform.sort(tested), expected);
    });

    it('should sort a real life case', function () {
      const tested = {
        Nuclides: {
          Variables: {
            'Font size': {},
            Grid: {},
            Viewport: {}
          },
          Colors: {
            Other: {},
            Grayscale: {},
            'Elements colors': {}
          },
          Fonts: {
            Other: {}
          },
          Mixins: {
            Helpers: {},
            Product: {},
            Fonts: {}
          },
        },
        Atoms: {
          Helpers: {},
          Navigation: {},
          Product: {},
          Typo: {
            _e: [
              {
                name: 'Separator',
              },
              {
                name: 'Heading',
              },
            ],
          },
          Brand: {},
          Forms: {}
        },
        Molecules: {
          Account: {},
          Header: {
            _e: {},
            Menu: {}
          },
          Other: {},
        },
        Structures: {
          Footer: {},
          Header: {
            _e: {},
            Menu: {},
            Logo: {}
          },
          Home: {},
        },
      };
      const expected = {
        Atoms: {
          Brand: {},
          Forms: {},
          Helpers: {},
          Navigation: {},
          Product: {},
          Typo: {
            _e: [
              {
                name: 'Heading',
              },
              {
                name: 'Separator',
              },
            ],
          },
        },
        Molecules: {
          Account: {},
          Header: {
            Menu: {},
            _e: {},
          },
          Other: {},
        },
        Nuclides: {
          Colors: {
            'Elements colors': {},
            Grayscale: {},
            Other: {},
          },
          Fonts: {
            Other: {},
          },
          Mixins: {
            Fonts: {},
            Helpers: {},
            Product: {},
          },
          Variables: {
            'Font size': {},
            Grid: {},
            Viewport: {},
          },
        },
        Structures: {
          Footer: {},
          Header: {
            Logo: {},
            Menu: {},
            _e: {},
          },
          Home: {},
        },
      };

      assert.deepEqual(Transform.sort(tested), expected);
      assert.deepEqual(JSON.stringify(Transform.sort(tested)), JSON.stringify(expected));
    });
  });

  /********************************************************/

  describe('#sortObject', function () {
    it('should sort an object in alphabetic order', function () {
      const tested = {
        c: {id: 1},
        a: {id: 2},
        b: {id: 3},
      };
      const expected = {
        a: {id: 2},
        b: {id: 3},
        c: {id: 1},
      };

      assert.deepEqual(Transform.sortObject(tested), expected);
    });
  });
});
