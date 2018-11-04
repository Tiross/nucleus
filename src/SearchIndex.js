/* SearchIndex.js -- Creates a searchable index of style guide components
 *
 * Copyright (C) 2016 Michael Seibt
 *
 * With contributions from: -
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

'use strict';

const SearchIndex = {
  index: [],
};

SearchIndex.create = function (styles) {
  for (let s in styles) {
    this.index = this.index.concat(this.indexCategory(styles[s]));
  }

  return this.index;
};

SearchIndex.indexCategory = function (category) {
  let categoryIndex = [];

  for (let e in category) {
    // It's a set of elements
    if (e === '_e') {
      categoryIndex = categoryIndex.concat(this.createElementIndex(category[e]));
      continue;
    }

    // It's a category
    categoryIndex = categoryIndex.concat(this.indexCategory(category[e]));
  }

  return categoryIndex;
};

SearchIndex.createElementIndex = function (elements) {
  let elementIndex = [];
  let element;

  for (let e in elements) {
    element = elements[e];
    elementIndex.push({
      name: element.name,
      type: element.type,
      section: element.section,
      description: element.description,
      descriptor: element.descriptor,
      location: element.location + '#' + element.hash,
      style: element, // TODO: pass only what we need
    });
  }

  return elementIndex;
};

module.exports = SearchIndex;
