import gulp from "gulp"
import paths from "../config/paths.js"
import plugins from "../config/plugins.js"

const files = () => {
	return gulp.src(paths.src.files)
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'FILES',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(gulp.dest(paths.build.files))
		.pipe(plugins.browserSync.stream())
}

export default files