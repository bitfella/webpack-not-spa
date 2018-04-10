# webpack-not-spa
Webpack 3 setup useful to build a simple website and not a super sophisticated spa (Wordpress theme anyone??!1?). Comes with Babel ES6 transpilation + polyfill, watch + LiveReload, eslint and more.

## Prerequisites
Install all needed dev dependencies through that classic line `npm install`; I guess even your mom know what this command stands for.

## Project structure
You should put your source files in the following folders and everything should work fine:

 - `./src/app.js` this is the entry point of your bundle, import any module js/css/whatever in this file. Folder structure is not mandatory, anyway the following folders are mapped in `webpack.config.js` to avoid relative path hell:
	 - `common`--> `./src/common/`;
	 - `components`--> `./src/components/`;
	 - `modules`--> `./src/modules/`;
	 - `services`--> `./src/services/`.

This means you can just do the following:

```import MainNav from 'modules/MainNav';```

no matter which folder your parent js is located in.

After the build you should get the following stuff in your `./dist` folder:

 - `bundle.js`;
 - `bundle.css`;
 - `./images/` all bundled (> 25KB size) images here;
 - `./fonts/` all bundled (> 25KB size) fonts here.

Sorry mate, no code splitting, this is just a basic setup :/

## Commands
Open your terminal and fire up one of the following npm scripts:

 - `npm start`: builds the project for development purposes;
 - `npm run watch`: builds the project for development purposes, watches the whole stuff for changes and reloads the page when needed (you should kill the process with ctrl+c when you need to);
 - `npm run build`: builds the project for productions (minifies and stuff).

## Side notes
In order to simplify your workflow, this Webpack setup uses `sass-resources-loader` to avoid the need to import sass functions, mixins, placeholders and variables everytime you need them. Simply drop them in the following partials and they will be available anywhere in the project:

 - `./src/common/abstracts/functions.scss`;
 - `./src/common/abstracts/mixins.scss`;
 - `./src/common/abstracts/placeholders.scss`;
 - `./src/common/abstracts/variables.scss`.
