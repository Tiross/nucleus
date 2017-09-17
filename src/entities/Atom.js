/* Atoms.js -- Transforms raw style information into an atom object
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

const Atom = function (raw) {
  // Call parent constructor
  Entity.call(this, raw);

  // Set atom-specific entity properties
  this.type = 'Atom';
  this.setFillable([
    'atom',
    'markup',
    'modifiers',
    'namespace',
    'script',
  ]);
};

Atom.prototype = Object.create(Entity.prototype);

module.exports = Atom;
