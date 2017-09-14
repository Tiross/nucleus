/* Molecule.js -- Transforms raw style information into a molecule object
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from: -
 *  - Ryan Potter (www.ryanpotter.co.nz)
 *  - Tiross
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
'use strict';

const Entity = require('./Entity');

const Molecule = function(raw) {
  // Call parent constructor
  Entity.call(this, raw);

  // Set molecule-specific entity properties
  this.type = 'Molecule';
  this.setFillable([
    'markup',
    'modifiers',
    'molecule',
    'script',
  ]);
};

Molecule.prototype = Object.create(Entity.prototype);

module.exports = Molecule;
