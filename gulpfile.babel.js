/*
 * gulp 自动化构建工作流程
 * 1.构建页面实时更新任务。（HTML页面修改、模板页面修改、scss文件更改、图片资源更改、前台JS文件更改）
 * 2.构建SCSS文件实时编译
 */

const gulp = require('gulp'),
    /**
     * 拥有实时重载（live-reloading）和 CSS 注入的服务器
     * @type {[type]}
     */
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    filter = require('gulp-filter'),
    /**
     * 编译 SASS
     * @type {[type]}
     */

    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    /**
     * JS 文件压缩
     * @type {[type]}
     */
    uglify = require('gulp-uglify'),
    /**
     * 文件更名
     * @type {[type]}
     */
    rename = require('gulp-rename'),
    /**
     * 提示信息
     * @type {[type]}
     */
    notify = require('gulp-notify'),
    /**
     * gulp顺序执行任务
     * @type {[type]}
     */
    gulpSequence = require('gulp-sequence'),
    /**
     * css 压缩
     * @type {[type]}
     */
    minifycss = require('gulp-minify-css'),
    /**
     * 文件合并
     * @type {[type]}
     */
    concat = require('gulp-concat'),

    /**
     * 删除文件和文件夹
     */
    del = require('del');

const url = "http://localhost:9527",
    dist_dir = "./dist/",
    css_dir = dist_dir + "./css/",
    js_dir = dist_dir + "./js/",
    img_dir = dist_dir + "./img/",
    plugins_dir = dist_dir + "./plugins/",
    fonts_dir = dist_dir + "./fonts/";

const src_dir = "./src/",
    src_scss_dir = src_dir + "./scss/",
    src_js_dir = src_dir + "./js/",
    src_img_dir = src_dir + "./img/",
    src_plugins_dir = src_dir + "./plugins/",
    src_fonts_dir = src_dir + "./fonts/";

gulp.task('watcher', () => {
    browserSync({
        //不显示在浏览器中的任何通知。
        // notify: false,
        //停止自动打开浏览器
        // open: false,
        port: 4567,
        proxy: {
            target: url,
            middleware: function(req, res, next) {
                console.log(req.url);
                next();
            }
        }
    });
    /**
     * 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
     * @type {[type]}
     */
    gulp.watch(src_scss_dir + "/**/*.{sass,scss}", ['sass:watch']);
    /**
     * 监听 src/js 里面业务相关的JS文件
     * @type {Object}
     */
    gulp.watch(src_js_dir + "/**/*.js", ['js:watch', reload]);
    /**
     * views 下面的页面变更立即刷新
     * @return {[type]} [description]
     */
    gulp.watch("./views/**/*.html").on('change', reload);
    /**
     * 监听plugins文件夹
     * @return {[type]} [description]
     */
    gulp.watch(src_plugins_dir + "/**/*.js", ['plugin', reload]);
})

/**
 * sass 文件编译为css文件、并且 合并、压缩、重命名css
 * [description]
 * @return {[type]}   [description]
 */
const sass_src = {
    inputfile: src_scss_dir + "./**/*.scss",
    output_dir: css_dir
}

/**
 * 测试
 */

gulp.task('sass:watch', function() {
    return sass(sass_src.inputfile, { sourcemap: true })
        .on('error', sass.logError)
        // For file sourcemaps 
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(sass_src.output_dir))
        // .pipe(reload({ stream: true }))
        .pipe(filter('**/*.css'))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(notify({ message: 'sass:watch task ok' }));
});
/*
    发布
 */
gulp.task('sass:build', function() {
    return sass(sass_src.inputfile, { sourcemap: true })
        .on('error', sass.logError)
        // .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(sass_src.output_dir))
        .pipe(notify({ message: 'sass:build task ok' }));
});

const js_src = {
    inputfile: src_js_dir + "/**/*.js",
    output: js_dir
}

/**
 * 测试
 * @param  {[type]} 'js:watch' [description]
 * @param  {[type]} (          [description]
 * @return {[type]}            [description]
 */

gulp.task('js:watch', () => {
    return gulp.src(js_src.inputfile)
        .pipe(gulp.dest(js_src.output));
});
/**
 * 部署
 * @param  {[type]} 'js:build' [description]
 * @param  {[type]} (          [description]
 * @return {[type]}            [description]
 */
gulp.task('js:build', () => {
    return gulp.src(js_src.inputfile)
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
            preserveComments: false
        }))
        .pipe(gulp.dest(js_src.output));
});

const plugins_src = {
    inputfile_js: [src_plugins_dir + "/jquery.min.js", src_plugins_dir + "/amazeui/amazeui.min.js", src_plugins_dir + "/common.js", src_plugins_dir + "/upload.js"],
    inputfile_css: src_plugins_dir + "/**/*.css",
    outputfile: plugins_dir
}

const plugins_mobiscroll = {
    inputfile_js: [src_plugins_dir + '/mobiscroll/js/mobiscroll.core.js', src_plugins_dir + '/mobiscroll/js/mobiscroll.widget.js', src_plugins_dir + '/mobiscroll/js/mobiscroll.scroller.js', src_plugins_dir + '/mobiscroll/js/mobiscroll.select.js'],
    outputfile: plugins_dir
}

const plugins_wechat = {
    inputfile_js:src_plugins_dir+'/wechat/*.js',
    outputfile: plugins_dir
}

/**
 * 第三方插件合并压缩
 * @param  {[type]} (          [description]
 * @return {[type]}            [description]
 */

gulp.task('plugin', () => {
    gulp.src(plugins_src.inputfile_js)
        .pipe(concat('plugins.min.js'))
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
            preserveComments: false
        }))
        .pipe(gulp.dest(plugins_src.outputfile));

    gulp.src(src_plugins_dir + "/echarts/echarts.simple.min.js").pipe(gulp.dest(plugins_src.outputfile));
    /*
        mobiscroll 插件打包
     */
    gulp.src(plugins_mobiscroll.inputfile_js)
        .pipe(concat('mobiscroll.min.js'))
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
            preserveComments: false
        }))
        .pipe(gulp.dest(plugins_mobiscroll.outputfile));
    /*
        wechat相关代码打包
     */
    gulp.src(plugins_wechat.inputfile_js)
        .pipe(concat('wechat.min.js'))
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true, //类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
            preserveComments: false
        }))
        .pipe(gulp.dest(plugins_wechat.outputfile));

    return gulp.src(plugins_src.inputfile_css)
        .pipe(concat('plugins.min.css'))
        .pipe(gulp.dest(plugins_src.outputfile));
});

const copy_fonts_src = {
    inputfiles: src_fonts_dir + "./*",
    outputfiles: fonts_dir
}

const copy_img_src = {
    inputfiles: src_img_dir + "./*",
    outputfiles: img_dir
}

/**
 * 文件清除
 * @return {[type]}     [description]
 */
gulp.task('clean', (cb) => {
    return del(['dist/*'], cb);
});

gulp.task('copy', ['copy:fonts', 'copy:img'], () => {});
/*
    复制 src/fonts 文件
 */
gulp.task('copy:fonts', () => {
    return gulp.src(copy_fonts_src.inputfiles)
        .pipe(gulp.dest(copy_fonts_src.outputfiles));
});
/*
    复制 src/img 文件
 */
gulp.task('copy:img', () => {
    return gulp.src(copy_img_src.inputfiles)
        .pipe(gulp.dest(copy_img_src.outputfiles));
});

/**
 * 本地调试环境
 */

gulp.task('server', ['clean'], (cb) => {
    gulpSequence(['copy', 'sass:watch', 'js:watch', 'plugin'], 'watcher')(cb)
});
/**
 * 部署
 */

gulp.task('build', ['clean'], (cb) => {
    gulpSequence(['copy', 'sass:build', 'js:build', 'plugin'])(cb)
});
