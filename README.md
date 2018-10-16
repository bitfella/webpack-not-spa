# webpack-not-spa
Webpack 4 setup useful to build a simple website and not a super sophisticated spa (Wordpress theme anyone??!1?). Comes with Babel 7 ES6 transpilation + polyfill, watch + LiveReload, eslint, stylelint and more.

## Prerequisites
Install all needed dev dependencies through that classic line `npm install`; I guess even your mom know what this command stands for.

## Project structure
You should put your source files in the following folders and everything should work fine:

 - `./src/index.js` this is the entry point of your bundle, import any module js/css/whatever in this file. Folder structure is not mandatory, anyway the following folders are mapped in `webpack.base.js` to avoid relative path hell:
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

## Code splitting
This setup supports Webpack's code splitting through dynamic imports syntax. Just use the following syntax and everything should work fine:

```javascript
import(/* webpackChunkName: "testme" */ 'modules/TestMe/TestMe').then(function(myChunk) {
    const TestMeClass = myChunk.default;
    const TestMe = new TestMeClass();

    console.log(TestMe.init());
});
```
Please refer to Webpack's official documentation to learn more. Event though this bundler supports IE11 through Babel Polyfill, please be aware that using code splitting could generate errors in legacy browers. [See this thread](https://github.com/babel/babel/issues/7402). If you're not using Promises anywhere in your code, a quick fix is to put the following code in your app entrypoint: 

```javascript
var p = Promise.resolve(0);

Promise.all([p]).then(function() {
  console.log("ALL OK");
});
```
This code snippet should generate the correct polyfill in your bundle file.

## Commands
Open your terminal and fire up one of the following npm scripts:

 - `npm start`: builds the project for development purposes;
 - `npm run watch`: builds the project for development purposes, watches the whole stuff for changes and reloads the page when needed (you should kill the process with ctrl+c when you need to);
 - `npm run build`: builds the project for productions (minifies and stuff);
 - `npm run test`: run tests with Jest [see Jest docs](https://jestjs.io/);
 - `npm run test:watch`: run and watch tests with Jest;
 - `npm run test:coverage`: run tests with Jest and generate code coverage report.

## Side notes
In order to simplify your workflow, this Webpack setup uses `sass-resources-loader` to avoid the need to import sass functions, mixins, placeholders and variables everytime you need them. Simply drop them in the following partials and they will be available anywhere in the project:

 - `./src/common/abstracts/functions.scss`;
 - `./src/common/abstracts/mixins.scss`;
 - `./src/common/abstracts/placeholders.scss`;
 - `./src/common/abstracts/variables.scss`.
