const Image = require("@11ty/eleventy-img");

module.exports = {
	image: async function(src, alt, className, sizes) {
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
