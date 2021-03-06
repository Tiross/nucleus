/* Transform.js -- Resolves annotation blocks into entity objects
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

const Atom = require('./entities/Atom');
const Color = require('./entities/Color');
const Font = require('./entities/Font');
const Icon = require('./entities/Icon');
const Mixin = require('./entities/Mixin');
const Molecule = require('./entities/Molecule');
const Nuclide = require('./entities/Nuclide');
const Structure = require('./entities/Structure');
const Verbose = require('./Verbose');

const Dot = require('dot-object');
const isNumeric = require('isnumeric');

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
Transform.forView = function (styles) {
  const viewData = {};
  const dot = new Dot(' > ');
  const that = this;

  for (let s in styles) {
    Verbose.spin('Analyzing styles');
    const style = styles[s];
    const entity = this.createEntity(style);

    // If entity is empty, we cold not specify a type or
    // validation failed during entity instantiation.
    if (!entity) {
      continue;
    }

    const fields = entity.getFields();

    // Pick the section or create it, if not defined yet.
    // TODO: _e is a bad idea!!
    // TODO: Extract!
    let section = dot.pick(fields.section, viewData) || {
      '_e': []
    };
    section._e.push(fields);
    dot.copy('data', fields.section, {
      data: section
    }, viewData);
  }

  return this.sort(viewData);
};

/**
 * Returns the type of the style.
 *
 * @param  {object} style
 * @return {string}
 */
Transform.getStyleType = function (style) {
  // Loop through the available type annotations and check if the style
  // has one of these. If there's more than one, show a warning.
  const typeAnnotations = [
    'atom',
    'color',
    'font',
    'icon',
    'mixin',
    'molecule',
    'nuclide',
    'structure',
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
Transform.hasAnnotation = function (key, style) {
  return Object.keys(style.annotations).indexOf(key) !== -1;
};

/**
 * Creates an Entity-Object out of raw style data.
 *
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
Transform.createEntity = function (style) {
  let entity;

  switch (this.getStyleType(style)) {
    case 'atom':
      entity = new Atom(style);
      break;
    case 'color':
      entity = new Color(style);
      break;
    case 'font':
      entity = new Font(style);
      break;
    case 'icon':
      entity = new Icon(style);
      break;
    case 'mixin':
      entity = new Mixin(style);
      break;
    case 'nuclide':
      entity = new Nuclide(style);
      break;
    case 'molecule':
      entity = new Molecule(style);
      break;
    case 'structure':
      entity = new Structure(style);
      break;
    default:
      // TODO: Is this possible? Maybe resolve the
      // anti-pattern then.
      console.log('Skipping unknown entity type.');

      return false;
  }

  return entity;
};

Transform.sort = function (obj) {
  const that = this;
  const keys = Object.keys(obj);

  if (Array.isArray(obj)) {
    obj.sort(function (a, b) {
      const A = ('sort' in a) ? a.sort : a.name.toUpperCase();
      const B = ('sort' in b) ? b.sort : b.name.toUpperCase();

      if (isNumeric(A) && isNumeric(B)) {
        return A - B;
      }

      return A.toString().localeCompare(B);
    });
  } else if (typeof(obj) === 'object') {
    keys.forEach(function (key) {
      obj[key] = that.sort(obj[key]);
    });

    obj = this.sortObject(obj);
  }

  return obj;
};

Transform.sortObject = function (obj) {
  var keys = Object.keys(obj).sort();
  var data = {};

  keys.forEach(function (key) {
    data[key] = obj[key];
  });

  return data;
};

module.exports = Transform;
