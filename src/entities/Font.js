/* Font.js -- Transforms raw style information into a font object
 *
 * Copyright (C) 2017
 *
 * With contributions from:
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

const Nuclide = require('./Nuclide');

const Font = function (raw) {
  const variations = {
    hairline: {
      name: 'Hairline',
      weight: 100,
    },
    thin: {
      name: 'Thin',
      weight: 200,
    },
    light: {
      name: 'Light',
      weight: 300,
    },
    regular: {
      name: 'Regular',
      weight: 400,
    },
    medium: {
      name: 'Medium',
      weight: 500,
    },
    semibold: {
      name: 'Semibold',
      weight: 600,
    },
    bold: {
      name: 'Bold',
      weight: 700,
    },
    black: {
      name: 'Black',
      weight: 800,
    },
    heavy: {
      name: 'Heavy',
      weight: 900,
    },
  };

  // Call parent constructor
  Nuclide.call(this, raw);

  // Set font-specific entity properties
  this.type = 'Font';
  this.setFillable([
    'font',
  ]);
  this.setFillable(Object.keys(variations));
  this.singleLine = false;

  this.fields.parameters = [];

  if (typeof(raw.annotations) !== 'undefined') {
    for (let variation in variations) {
      if (variations.hasOwnProperty(variation) && variation in raw.annotations) {
        this.fields.parameters.push(variations[variation]);
      }
    }
  }

  if (!this.fields.parameters.length) {
    this.fields.parameters.push(variations.regular);
  }
};

Font.prototype = Object.create(Nuclide.prototype);

module.exports = Font;
