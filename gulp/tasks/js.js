import gulp from "gulp"
import paths from "../config/paths.js"
import plugins from "../config/plugins.js"

import webpack from "webpack-stream"
import babel from "gulp-babel"

const js = () => {
	return gulp.src(paths.src.js, { sourcemaps: app.isDev })
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(babel())
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'main.min.js',
			},
			module: {
				rules: [
					{
						test: /\.css$/,
						use: ['style-loader', 'css-loader'],
					}
				]
			}
		}))
		.pipe(gulp.dest(paths.build.js))
		.pipe(plugins.browserSync.stream())
}

export default js