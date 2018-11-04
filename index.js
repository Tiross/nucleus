#!/usr/bin/env node

'use strict';

const Config = require('./src/Config');
const Verbose = require('./src/Verbose');
const Crawler = require('./src/Crawler');
const Transform = require('./src/Transform');
const Substitute = require('./src/Substitute');
const SearchIndex = require('./src/SearchIndex');

const jade = require('pug');

/*
|--------------------------------------------------------------------------
| BOOTSTRAP
|--------------------------------------------------------------------------
|
| We need to collect configuration and environment information before
| starting the application.
|
*/

// If requested, run the init script and stop the execution here
if (Config.shouldRunInit()) {
  require('./init');
  process.exit(0);
}

var config = Config.parse();
Verbose.setLevel(config.verbose);
Verbose.start();
Verbose.status('Found ' + config.files.length + ' files.');

/*
|--------------------------------------------------------------------------
| CRAWL
|--------------------------------------------------------------------------
|
| Start the parser that crawls the stylesheets for DocBlock annotations.
|
*/

var styles = [];
for (var f in config.files) {
  var file = config.files[f];
  Verbose.spin('Crawling ' + file);
  var style = Crawler.processFile(file);
  styles = styles.concat(style);
}

/*
|--------------------------------------------------------------------------
| TRANSFORM
|--------------------------------------------------------------------------
|
| Prepare the styleguide data for view generation.
|
*/

Verbose.spin('Analyzing styles');
styles = Substitute.injectConfig(config).process(styles);
var styleguides = Transform.forView(styles);

Verbose.spin('Creating search index');
var searchIndex = SearchIndex.create(styleguides);

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
|
| Generate the view files.
|
*/

Verbose.spin('Generating files');

// Create the target folder
require('mkdirp').sync(config.target);

// Build the template files
var templateFiles = ['atoms', 'molecules', 'index', 'nuclides', 'structures'];
for (var t in templateFiles) {
  Verbose.spin('Generating files');
  var html = jade.renderFile(config.template.replace(/\/$/, '') + '/' + templateFiles[t] + '.pug', {
    styles: styleguides,
    index: searchIndex,
    meta: {
      css: config.css,
      title: config.title,
      namespace: config.namespace,
      counterCSS: config.counterCSS,
      scripts: config.scripts,
      demo: !!config.demo,
    },
  });
  require('fs').writeFileSync('./' + config.target + '/' + templateFiles[t] + '.html', html);
}

// Copy assets
if (config.target !== 'build') {
  var fs = require('fs');
  var path = require('path');
  require('mkdirp').sync(config.target + '/styles');
  require('mkdirp').sync(config.target + '/fonts');
  require('mkdirp').sync(config.target + '/scripts');

  [
    'styles/app.css',
    'scripts/app.js',
    'favicon.ico',
    'fonts/SG-icons.eot',
    'fonts/SG-icons.ttf',
    'fonts/SG-icons.woff',
  ].forEach((file) => {
    fs
      .writeFileSync(path.join(config.target, file), fs.readFileSync(path.join(__dirname, 'build', file)))
    ;
  });
}

/*
|--------------------------------------------------------------------------
| THANKS FOR YOUR ATTENTION
|--------------------------------------------------------------------------
*/

Verbose.finished();
