[![Nucleus](https://tiross.github.io/nucleus/images/git-header.png)](https://tiross.github.io/nucleus/demo/index.html)

[Home Page](https://tiross.github.com/nucleus/index.html) &nbsp; &bull; &nbsp;
[Demo](https://tiross.github.com/nucleus/demo/index.html) &nbsp; &bull; &nbsp;
[Getting Started](https://tiross.github.com/nucleus/getting-started.html) &nbsp; &bull; &nbsp;
[Documentation](https://tiross.github.com/nucleus/annotation-reference.html)

[![Build Status](https://travis-ci.org/Tiross/nucleus.svg?branch=master)](https://travis-ci.org/Tiross/nucleus)
[![npm](https://badge.fury.io/js/nucleus-generator.svg)](https://www.npmjs.com/package/nucleus-generator)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](LICENSE)

Nucleus is a living style guide generator for atomic css based components. It's a Node application parsing the source SCSS files and reading information from DocBlock annotations.

![Nucleus Preview](https://tiross.github.io/nucleus/images/git-teaser.png)

## Quick start

A more detailed installation instruction can be found [here](https://tiross.github.com/nucleus/installation.html).

Install globally (prefered):

```
npm install -g nucleus-generator
```

Inside your project root folder, create a configuration with:

```
nucleus init
```

Run nucleus:

```
nucleus
```

Open ```http://YOUR_LOCAL_DEV_URL/styleguide``` .

## Contributing

If you found a bug, please try to submit a pull request with a failing test. For new issues, please take note of the [Contribution guidelines](https://github.com/Tiross/nucleus/blob/master/CONTRIBUTING.md). Especially bug reports should at least contain [required information](https://github.com/Tiross/nucleus/blob/master/CONTRIBUTING.md).

Nucleus was developed by pirates from HolidayPirates and PirateTechnologies.

## License

Nucleus is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
