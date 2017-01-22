
const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const stylish = require('jshint-stylish');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();

const relativePath = '../../<%= mainAppId %>/apps';
const appid = '<%= appId %>';

const config = {
    styles: 'css',
    images: 'img',
    scripts: 'js',
    tpls: 'tpls',
    dist: relativePath + '/' + appid
};

var dev = true;

gulp.task('lint', function() {
  return gulp.src(path.join(config.scripts, '/**/*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.if(dev, gulp.dest(path.join(config.dist, 'js'))));
});

gulp.task('clean', del.bind(null, [config.dist], { force: true }));

gulp.task('styles', () => {
    if (dev) {
        return gulp.src(path.join(config.styles, '/**/*.css'))
          .pipe(gulp.dest(path.join(config.dist, 'css')));
    } else {
        return gulp.src(path.join(config.styles, '/**/*.css'))
            .pipe($.concat('style.css'))
            .pipe($.cssnano({ safe: true, autoprefixer: false }))
            .pipe(gulp.dest(path.join(config.dist, config.styles)));
    }
});

gulp.task('images', () => {
    return gulp.src(path.join(config.images, '/**/*'))
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest(path.join(config.dist, config.images)));
});

gulp.task('scripts', () => {
    return gulp.src([
            path.join(config.scripts, 'app-dist.js'),
            path.join(config.scripts, '/*/*.js')
        ]).pipe($.concat('app.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(path.join(config.dist, config.scripts)));
});

gulp.task('tpls', () => {
    return gulp.src(path.join(config.tpls, '/**/*.html'))
        .pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.join(config.dist, config.tpls)));
});

gulp.task('extras', () => {
    return gulp.src([
        '*.json',
        '*.{png,jpg,jpeg,gif}'
    ], {
        dot: true
    }).pipe(gulp.dest(config.dist));
});

gulp.task('config', () => {
    return gulp.src('../config.json').pipe(gulp.dest(relativePath));
});

gulp.task('build', ['styles', 'images', 'scripts', 'tpls', 'extras', 'config'], () => {
    return gulp.src(path.join(config.dist, '/**/*')).pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('zip', () => {
    return gulp.src(path.join(config.dist, '/**/*'), { base: relativePath })
        .pipe(zip(appid + '.zip'))
        .pipe(gulp.dest(relativePath));
});

gulp.task('default', () => {
    runSequence('clean', ['styles', 'lint', 'images', 'tpls', 'extras', 'config'], () => {
        gulp.watch('css/**/*.css', ['styles']);
        gulp.watch('js/**/*.js', ['lint']);
        gulp.watch('img/**/*', ['images']);
        gulp.watch('tpls/**/*.html', ['tpls']);
        gulp.watch('*.json', ['extras']);
        gulp.watch('*.{png,jpg,jpeg,gif}', ['extras']);
        gulp.watch('../config.json', ['config']);
    });
});

gulp.task('dist', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence('clean', 'lint', 'build', 'zip', resolve);
    });
});
