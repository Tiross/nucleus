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

const Entity = require('./Entity');
const ColorConverter = require('color');

const Color = function(raw) {
  // Call parent constructor
  Entity.call(this, raw);

  // Set color-specific entity properties
  this.type = 'Color';
  this.setFillable([
    'color',
  ]);

  // Single-line annotation block means @color is the description.
  if (!raw.annotations.description) {
    raw.annotations.description = raw.annotations.color;
  }

  const colorValue = ColorConverter(raw.element.value.replace(/ *!default/, ''));

  this.fields = {
    location: 'nuclides.html',
    section: 'Nuclides',
    values: {
      hex: colorValue.hexString(),
      rgba: colorValue.rgbaString(),
      darker: colorValue.darken(0.1).hexString(),
    },
  };
};

Color.prototype = Object.create(Entity.prototype);

module.exports = Color;
