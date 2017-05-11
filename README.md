# react-mobx-react-router4-typescript-boilerplate
React, React-Router 4, MobX and Webpack 2-boilerplate with async routes written in Typescript.

Based on brilliant [Repo](https://github.com/mhaagens/react-mobx-react-router4-boilerplate/blob/master/README.md) made by [mhaagens](https://github.com/mhaagens) which was written in javascript.

This repo is based on original one but its been rewritten using [Typescript](http://www.typescriptlang.org/) language.

## Instructions
Just run `npm install` and `npm start`, then go to localhost:3000 to start developing.
To build, run `npm run build`, and to preview run `npm run preview`, then go
to localhost:1234 for the minified production bundle.

#### Async component loading
Components are now loaded async with react-router-loader and the store is injected via MobX Provider. 
If you've downloaded this boilerplate before remember to run `npm install` again.

#### Hot reload
Hot reload is working even with typescript in place. Just try it, run `npm start`, browse `http://localhost:3000` and edit some text in any of tsx file and your should automatically see changes in your browser.

### More information
If you need more information, check original repo [readme](https://github.com/mhaagens/react-mobx-react-router4-boilerplate/blob/master/README.md).

### Yarn
As i do not using (for now) yarn, no `yarn.lock` file is provided yet. If you need it, just let me know.