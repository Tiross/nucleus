/* Nuclide.js -- Transforms raw style information into a nuclide object
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from: -
 *  - Tiross
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

var Entity = require('./Entity');

var Nuclide = function(raw) {
  // Call parent constructor
  Entity.call(this, raw);

  this.type = 'Nuclide';
  this.setFillable([
    'nuclide',
  ]);

  // Single-line annotation block means @nuclide is the description.
  if (!raw.annotations.description) {
    raw.annotations.description = raw.annotations.nuclide;
  }

  this.fields = {
    name: raw.descriptor,
    value: raw.element.value,
  };
};

Nuclide.prototype = Object.create(Entity.prototype);

module.exports = Nuclide;
