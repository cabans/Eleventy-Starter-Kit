const { EleventyI18nPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");

module.exports = function (eleventyConfig) {
	// Add cache busting
	eleventyConfig.addPlugin(eleventyAutoCacheBuster);

	// Watch CSS files for changes to inject CSS without a page refresh
	eleventyConfig.setServerOptions({
		watch: ["dist/**/*.css"],
		domDiff: true,
		liveReload: true
	});

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

	eleventyConfig.addPlugin(eleventyAutoCacheBuster);

	eleventyConfig.addShortcode("image", async function (src, alt, className, sizes) {
		if (alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on myImage from: ${src}`);
		}

		let metadata = await Image(src, {
			widths: [320, 1024, 2560],
			formats: ["webp", "jpeg"],
			urlPath: "/assets/img/",
			outputDir: "./dist/assets/img/",
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				return `${name}-${width}w.${format}`;
			}
		});

		let lowsrc = metadata.jpeg[0];

		// You bet we throw an error on a missing alt (alt="" works okay)
		// return Image.generateHTML(metadata, imageAttributes);

		// Custom format img element returning HTML
		return `<picture class="${className}">
        ${Object.values(metadata).map(imageFormat => {
			return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
		}).join("\n")}
          <img
            src="${lowsrc.url}"
            width="${lowsrc.width}"
            height="${lowsrc.height}"
            alt="${alt}"
            loading="lazy"
            decoding="async">
        </picture>`;
	});

	// Asset Watch Targets
	eleventyConfig.addWatchTarget('./src/assets/scripts')

	// Pass-through files
	// eleventyConfig.addPassthroughCopy('src/robots.txt')
	// eleventyConfig.addPassthroughCopy('src/site.webmanifest')
	// eleventyConfig.addPassthroughCopy('src/assets/img')
	// eleventyConfig.addPassthroughCopy('src/assets/fonts')



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
