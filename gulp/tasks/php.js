import gulp from "gulp"
import paths from "../config/paths.js"
import plugins from "../config/plugins.js"

const php = () => {
	return gulp.src(paths.src.php, { sourcemaps: app.isDev })
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'PHP',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(gulp.dest(paths.build.php))
		.pipe(plugins.browserSync.stream())
}

export default php