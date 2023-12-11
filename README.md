# Cabans Eleventy Starter Kit

A simple [Eleventy](https://www.11ty.dev/) (11ty) Starter Kit, that it works as base for all my static projects. 

⚠️ This project is a work in progress, you have been warned 😊


## Key Features

* CSS working with Sass (SCSS syntax)
* CSS clean and minification on production
* JS Bundling via 11ty.js script (Webpack)
* Image optimization
* Uses Nunjucks as template engine
* HTML ninification
* Everything runs through Eleventy
* i18n support by default

## Getting Started

To install the necessary packages, run the command on your package manager flavor of choice:

```sh
npm install
yarn
```

### Commands

* Run `npm start` for a development server and live reloading
* Run `npm run build` to generate a production build (output in `dist` folder)

## CSS

Styles works with Sass (SCSS syntax). The main file is in `src/assets/styles/main.scss`.
On `build` command it will be processed and optimized. The output is in `dist/assets/styles/main.css`

## JS

Javascript works with ES6 syntax, trough WEbpack. The main file is in `src/assets/scripts/main.js`.
It will be transpiled and minified in production. The output is in `dist/assets/scripts/main.js`


## TODO

- [ ] Use layouts for pages
- [ ] Add partials for common elements
- [ ] Move transforms to `src/utils` folder
- [ ] Move filters to `src/utils` folder
- [ ] Move shortcodes to `src/utils` folder
- [ ] Add SVG sprite support
- [ ] Add `robots.txt` support
- [ ] Add `sitemap.xml` support
- [ ] Add `manifest.json` support

## Credits

* [Eleventy](https://www.11ty.dev/)
* [Sass](https://sass-lang.com/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)

### Hardly inspired by 💖

* [Eleventastic by Max Böck](https://github.com/maxboeck/eleventastic)
* [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog)
* [Starter Kit v4 - Eleventy Blog + Netlify CMS](https://github.com/Oak-Harbor-Kits/Starter-Kit-V4-Eleventy)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
