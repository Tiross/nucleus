/* Transform.js -- Resolves annotation blocks into entity objects
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from: -
 *  - Ryan Potter (www.ryanpotter.co.nz)
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

const Verbose = require('./Verbose');
const Nuclide = require('./entities/Nuclide');
const Color = require('./entities/Color');
const Font = require('./entities/Font');
const Mixin = require('./entities/Mixin');
const Atom = require('./entities/Atom');
const Icon = require('./entities/Icon');
const Molecule = require('./entities/Molecule');
const Structure = require('./entities/Structure');

const Dot = require('dot-object');

const Transform = {};

/**
 * Calls the transformation for every style and sorts it into
 * groups expected by the view.
 *
 * @param  {object} styles
 *         Raw styles information from the crawler.
 * @return {object}
 *         Transformed view data.
 */
Transform.forView = function(styles) {
  const viewData = {};
  const dot = new Dot(' > ');

  for (let s in styles) {
    Verbose.spin('Analyzing styles');
    let style = styles[s];
    let entity = this.createEntity(style);

    // If entity is empty, we cold not specify a type or
    // validation failed during entity instantiation.
    if (!entity || (Object.keys(entity).length === 0)) {
      continue;
    }

    // Pick the section or create it, if not defined yet.
    // TODO: _e is a bad idea!!
    // TODO: Extract!
    let section = dot.pick(entity.section, viewData) || {
      '_e': []
    };
    section._e.push(entity);
    dot.copy('data', entity.section, {
      data: section
    }, viewData);
  }

  return viewData;
};

/**
 * Returns the type of the style.
 *
 * @param  {object} style
 * @return {string}
 */
Transform.getStyleType = function(style) {
  // Loop through the available type annotations and check if the style
  // has one of these. If there's more than one, show a warning.
  const typeAnnotations = [
    'color',
    'font',
    'mixin',
    'nuclide',
    'atom',
    'icon',
    'molecule',
    'structure'
  ];
  let foundType = null;

  for (let t in typeAnnotations) {
    if (this.hasAnnotation(typeAnnotations[t], style)) {

      // Do we have multiple style type annotations?
      if (foundType !== null) {
        Verbose.warn('multiple_types', [style]);
      }

      foundType = typeAnnotations[t];
    }
  }

  // Whow warning, if no type has been found.
  if (foundType === null) {
    Verbose.warn('no_type_annotation', [style]);
  }

  return foundType;
};

/**
 * Returns whether a style has a given annotation.
 *
 * @param  {string}  key
 * @param  {object}  style
 * @return {Boolean}
 *         Returns true if the annotation exists.
 */
Transform.hasAnnotation = function(key, style) {
  return Object.keys(style.annotations).indexOf(key) !== -1;
};

/**
 * Creates an Entity-Object out of raw style data.
 *
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
Transform.createEntity = function(style) {
  let entity;

  switch (this.getStyleType(style)) {
    case 'color':
      entity = new Color(style);
      break;
    case 'font':
      entity = new Font(style);
      break;
    case 'mixin':
      entity = new Mixin(style);
      break;
    case 'atom':
      entity = new Atom(style);
      break;
    case 'icon':
      entity = new Icon(style);
      break;
    case 'molecule':
      entity = new Molecule(style);
      break;
    case 'structure':
      entity = new Structure(style);
      break;
    case 'nuclide':
      entity = new Nuclide(style);
      break;
    default:
      // TODO: Is this possible? Maybe resolve the
      // anti-pattern then.
      console.log('Skipping unknown entity type.');

      return false;
  }

  return entity.getFields();
};

module.exports = Transform;
