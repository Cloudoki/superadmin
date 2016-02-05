# Cloudoki Superadmin

## Features
- Gulp;
- Bower to manage dependencies;
- CSS pre-compile through SASS;
- JShint;
- Mustache to render templates;
- SASS and JS minification and concatenation;
- RequireJS;
- Oauth2 authentication flow;

## Requirements
- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Install
Install the dependencies with `npm install` or `sudo npm install`. Run `bower install` to install the vendor dependencies. If bower is not installed, run a `sudo npm install -g bower` first.

## Configuration
The auth configurations are located in the `src/js/config_example.js` file. Since configurations may vary from local setup to production setup, to enable these you must do a `cp src/js/config_example.js config.js` first. The generated file will be your configuration file, and should never be commited back to the repo.

## Adding packages
The package is setup so you can easily add external packages to your project, while making it easier to manage dependencies. Doing
`bower install <package-name>` will add the package to the src/vendor folder. You can browse for available bower packages through [bower search page](http://bower.io/search/), and general documentation on bower in [bower.io](http://bower.io/).

After adding the package, you need to include it into the build process (gulpfile.js:41) and into your main.js file. Both have documented examples in the files themselves. 

## Gulp tasks
- **gulp** will build the files inside the /dist folder and perform a watch. You are ready to start developing
- **gulp clean** will clean the dist folder
- **gulp build** will build the files inside the /dist folder without triggering a watch