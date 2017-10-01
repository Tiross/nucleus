/* global describe */
/* global it */

'use strict';

const assert = require('assert');
const Font = require('../src/entities/Font.js');
const Helpers = require('./helpers');
const Verbose = require('../src/Verbose.js');

describe('Font', function () {
  it('should return nothing if the raw input is not valid', function () {
    Helpers.hook(Verbose, 'log');

    const entity = new Font({});
    assert.deepEqual(entity.getFields(), {});

    assert.ok(Helpers.logCalled >= 1);
  });

  /********************************************************/

  it('should transform raw input data to a font entity', function () {
    const entity = new Font({
      annotations: {
        font: 'Comic sans serif',
      },
      element: {
        prop: '$font-family',
        value: 'Comic sans serif',
      },
    });

    assert.deepEqual(entity.getFields(), {
      deprecated: false,
      description: '',
      descriptor: '$font-family',
      file: null,
      hash: '2aa0ea7987f857e71f8ae2271ec299f96562d4b7',
      location: 'nuclides.html',
      markup: null,
      modifiers: [],
      name: 'Comic sans serif',
      namespace: null,
      parameters: [
        {
          name: 'Regular',
          weight: 400,
        },
      ],
      script: false,
      section: 'Nuclides > Fonts > Other',
      table: false,
      type: 'font',
      value: 'Comic sans serif',
    });
  });

  /********************************************************/

  describe('should transform font weight input', function () {
    const weights = [
      {
        key: 'hairline',
        name: 'Hairline',
        numeric: 100,
      },
      {
        key: 'thin',
        name: 'Thin',
        numeric: 200,
      },
      {
        key: 'light',
        name: 'Light',
        numeric: 300,
      },
      {
        key: 'regular',
        name: 'Regular',
        numeric: 400,
      },
      {
        key: 'medium',
        name: 'Medium',
        numeric: 500,
      },
      {
        key: 'semibold',
        name: 'Semibold',
        numeric: 600,
      },
      {
        key: 'bold',
        name: 'Bold',
        numeric: 700,
      },
      {
        key: 'black',
        name: 'Black',
        numeric: 800,
      },
      {
        key: 'heavy',
        name: 'Heavy',
        numeric: 900,
      },
    ];

    weights.forEach(function (weight) {
      it('should transform font weight "' + weight.key + '"', function () {
        const options = {
          annotations: {
            description: 'Test font entity',
          },
          element: {
            prop: '$font-family',
            value: 'Comic sans serif',
          },
        };

        options.annotations[weight.key] = true;

        const entity = new Font(options);

        assert.deepEqual(entity.getFields().parameters, [
          {
            name: weight.name,
            weight: weight.numeric,
          },
        ]);
      });
    });
  });
});
