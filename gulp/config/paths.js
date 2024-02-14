import * as nodePath from "path"
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = './dist'
const srcFolder = './src'

const paths = {
	build: {
		files: `${buildFolder}/files/`,
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		php: `${buildFolder}/php/`,
		img: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
	},
	src: {
		files: `${srcFolder}/files/**/*.*`,
		html: `${srcFolder}/app/**/*.html`,
		scss: `${srcFolder}/app/scss/style.scss`,
		js: `${srcFolder}/app/js/main.js`,
		php: `${srcFolder}/app/php/**/*.*`,
		img: `${srcFolder}/app/img/**/*.*`,
		svgSprite: `${srcFolder}/app/svg-sprite/*.svg`,
	},
	watch: {
		files: `${srcFolder}/app/files/**/*.*`,
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/**/*.scss`,
		js: `${srcFolder}/**/*.js`,
		php: `${srcFolder}/app/php/**/*.*`,
		img: `${srcFolder}/app/img/**/*.*`,
	},
	clean: buildFolder,
	buildFolder,
	srcFolder,
	rootFolder,
	ftp: 'localhost',
}

export default paths