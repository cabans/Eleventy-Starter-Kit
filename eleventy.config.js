const { EleventyI18nPlugin } = require("@11ty/eleventy");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");
const svgSprite = require("eleventy-plugin-svg-sprite");
const shortcodes = require('./utils/shortcodes.js');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(svgSprite, {
		path: "./src/assets/icons", // relative path to SVG directory
		outputFilepath : "./dist/assets/icons.svg", // relative path to output directory
		defaultClasses: "icon",
		svgSpriteShortcode: "iconsprite",
		svgShortcode: "icon"
	});

	// Watch CSS files for changes to inject CSS without a page refresh
	eleventyConfig.setServerOptions({
		watch: ["dist/**/*.css"],
		domDiff: true,
		liveReload: true
	});

	// Asset Watch Targets for scripts
	eleventyConfig.addWatchTarget('./src/assets/scripts')

	// Localization
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		// any valid BCP 47-compatible language tag is supported
		defaultLanguage: "en", // Required, this site uses "es"
		errorMode: "strict",
		filters: {
			// transform a URL with the current page’s locale code
			url: "locale_url",

			// find the other localized content for a specific input file
			links: "locale_links",
		}
	});


	// Shortcodes
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	// Pass-through files
	// eleventyConfig.addPassthroughCopy('src/robots.txt')
	// eleventyConfig.addPassthroughCopy('src/site.webmanifest')
	// eleventyConfig.addPassthroughCopy('src/assets/img')
	// eleventyConfig.addPassthroughCopy('src/assets/fonts')

	// Add cache busting
	eleventyConfig.addPlugin(eleventyAutoCacheBuster);


	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data'
		}
	};
};
