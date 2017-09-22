var gulp= require("gulp");
var htmlmin= require('gulp-htmlmin');
var sass= require("gulp-sass");
var notify= require("gulp-notify");

/*
  Task responsável por minificar o HTML.
*/

gulp.task('reduzirHTML', function(){
	return gulp.src('./source/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'));
});

/*
  Task responsável por recuperar todos arquivos no formato .scss
  e retornar para pasta css que será criada automaticamente.
*/

gulp.task("compilarReduzirCSS", function(){
	return gulp.src(['./source/scss/*.scss'])
				.pipe(sass({outputStyle: 'compressed'}))
				.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
				.pipe(gulp.dest("dist/css"))
});

/*
	Task responsável por executar de fundo todas a mudanças que houver nos arquivos
*/

gulp.task("watch", function(){
	gulp.watch("./source/scss/*.scss", ['compilarReduzirCSS']);
	gulp.watch("./source/index.html", ['reduzirHTML']);
});

/*
  Task default para iniciar apenas com o comando "gulp" no terminal
*/

gulp.task("default",['reduzirHTML', 'compilarReduzirCSS', 'watch']);