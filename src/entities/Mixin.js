/* Mixin.js -- Transforms raw style information into a mixin object
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

const Nuclide = require('./Nuclide');

const Mixin = function (raw) {
  // Call parent constructor
  Nuclide.call(this, raw);

  // Set mixin-specific entity properties
  this.type = 'Mixin';
  this.setFillable([
    'example',
    'mixin',
    'param',
  ]);

  this.fields.name = raw.descriptor.match(/[^\s(]+/)[0];
  this.fields.example = this.getExample();
  this.fields.parameters = this.getParameters();
  this.fields.signature = raw.descriptor.match(/[^\s(]+(.*)/)[1];
};

Mixin.prototype = Object.create(Nuclide.prototype);

/**
 * Collects information about the parameters of the mixin from annotations and
 * the raw source code element.
 *
 * @return {object}
 */
Mixin.prototype.getParameters = function () {
  const parameters = [];
  const paramString = this.raw.descriptor.match(/\((.*)\)/);
  let docParameters;
  let param;
  let paramCodeRE;
  let paramCode;

  // If there're no parameters in the descriptor definition,
  // we don't need to take a closer look
  if (!paramString) {
    return [];
  }

  docParameters = this.raw.annotations.param;

  // If there's only one parameter, make it an array
  if (typeof docParameters === 'string') {
    docParameters = [docParameters];
  }

  for (let p in docParameters) {
    param = this.getParameter(docParameters[p]);
    paramCodeRE = new RegExp('(\\' + param.name + '.*?(?=\\,\\s\\$|$))');
    paramCode = paramString[1].match(paramCodeRE)[0];
    param.optional = !!paramCode.match(/:/);
    parameters.push(param);
  }

  return parameters;
};

/**
 * Parses a parameter annotation to parameter name and description part.
 *
 * @param  {param} parameterString
 * @return {object}
 */
Mixin.prototype.getParameter = function (parameterString) {
  // Remove line breaks from the current annotation string, in order to
  // not break the regexp, since . does not match line breaks.
  parameterString = parameterString.replace(/\n/g, ' ');

  const param = parameterString.match(/^([^\s]+)(.*)$/);

  return {
    name: param[1].trim(),
    description: param[2].trim(),
  };
};

Mixin.prototype.getExample = function () {
  if (this.hasNotAnnotation('example')) {
    return '';
  }

  return this.raw.annotations.example;
};

module.exports = Mixin;
