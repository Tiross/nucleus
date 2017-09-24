/* Color.js -- Transforms raw style information into a color object
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from:
 *  - Chris Tarczon (@tarczonator)
 *  - Tiross
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

const Nuclide = require('./Nuclide');
const config = require('../Config').parse();
const ColorConverter = require('color');

const Color = function(raw) {
  // Call parent constructor
  Nuclide.call(this, raw);

  // Set color-specific entity properties
  this.type = 'Color';
  this.setFillable([
    'color',
    'contrast',
  ]);

  this.fields.location = 'nuclides.html';
  this.fields.section = 'Nuclides';

  if (typeof(raw.element) !== 'undefined') {
    const colorValue = ColorConverter(raw.element.value.replace(/ *!default/, ''));

    this.fields.sort = colorValue.rgbNumber();
    this.fields.values = {
      hex: colorValue.hexString(),
      rgba: colorValue.rgbaString(),
      darker: colorValue.darken(0.1).hexString(),
      contrast: raw.annotations.contrast || config.colorContrast,
    };
  }
};

Color.prototype = Object.create(Nuclide.prototype);

module.exports = Color;
