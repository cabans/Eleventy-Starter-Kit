const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");

module.exports = {
	/**
	 * Image shortcode
	 *
	 * @param   string  src          Path to the source image
	 * @param   string  alt          Alternative text
	 * @param   string  className    Just a class name(s) (optional)
	 * @param   string  sizes        Image sizes attribute (optional)
	 *
	 * @return  string               HTML picture element
	 */
	image: async function(src, alt, className, sizes) {
		if (alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on myImage from: ${src}`);
		}

		// Check if the file extension is SVG
		const isSVG = path.extname(src).toLowerCase() === '.svg';

		// If SVG, return the SVG content inline
		if (isSVG) {
			// Read the file content
			const svgContent = fs.readFileSync(src, 'utf8');

			// Extract inner content and viewBox from SVG content using RegExp
			const match = svgContent.match(/<svg\s[^>]*>(.*?)<\/svg>/s);
			const innerContent = match ? match[1] : '';
			const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
			const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

			// Return the SVG content inline
			return `<svg class="${className}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${alt}">
				<desc>${alt}</desc>
				${innerContent}
			</svg>`;
		}


		// Eleventy 11ty Image generation
		let metadata = await Image(src, {
			widths: [480, 1200, 2560],
			formats: ["webp", "jpeg"],
			urlPath: "/assets/img/",
			outputDir: "./dist/assets/img/",
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				return `${name}-${width}w-${id}.${format}`;
			}
		});

		// Get the low-res version of our responsive images
		let lowsrc = metadata.jpeg[0];

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
	}
}
