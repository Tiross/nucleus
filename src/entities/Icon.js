/* Icon.js -- Transforms raw style information into an icon object
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

const Icon = function(raw) {
  // Call parent constructor
  Entity.call(this, raw);

  // Set icon-specific entity properties
  this.type = 'Icon';
  this.setFillable([
    'icon',
    'markup',
  ]);

  this.fields = {
    section: 'Atoms',
  };
};

Icon.prototype = Object.create(Entity.prototype);

module.exports = Icon;
