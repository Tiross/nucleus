/* Structure.js -- Transforms raw style information into a structure object
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from: -
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

var Entity = require('./Entity');

var Structure = function(raw) {
  // Call parent constructor
  Entity.call(this, raw);

  // Set structure-specific entity properties
  this.type = 'Structure';
  this.setFillable([
    'flag',
    'markup',
    'modifiers',
    'script',
    'structure',
  ]);

  // Validate the raw input data for common mistakes
  if (!this.validate()) {
    return {};
  }

  return this.prepareData({
    flags: this.getFlags(),
    modifiers: this.getModifiers(),
    markup: raw.annotations.markup,
    name: this.getName(),
    script: raw.annotations.script || false,
  });
};

Structure.prototype = Object.create(Entity.prototype);

// TODO: Remove code duplication
Structure.prototype.getFlags = function() {
  var raw_flags = this.raw.annotations.flag || [];
  var flags = {};

  if (raw_flags.indexOf('full-width') !== -1) {
    flags.fullWidth = true;
  }

  if (raw_flags.indexOf('inline') !== -1) {
    flags.inline = true;
  }

  return flags;
};


module.exports = Structure;
