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

const Entity = require('./Entity');

const Nuclide = function(raw) {
  // Call parent constructor
  Entity.call(this, raw);

  this.type = 'Nuclide';
  this.setFillable([
    'nuclide',
  ]);
  this.singleLine = true;

  this.fields.location = 'nuclides.html';
  this.fields.section = 'Nuclides';

  if (typeof(raw.element) !== 'undefined') {
    this.fields.value = raw.element.value;
  }
};

Nuclide.prototype = Object.create(Entity.prototype);

module.exports = Nuclide;
