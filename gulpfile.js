/**
 * Created by WUQD on 2016/12/22.
 */
/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp= require('gulp'), //基础库
    runsequence = require('run-sequence'),     //顺序执行任务,gulp默认是异步的
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    ngmin = require('gulp-ngmin'),             //Angularjs项目压缩
    ngannotate = require('gulp-ng-annotate'),
    htmlmin = require('gulp-htmlmin'),         //html压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload,自动刷新页面
    flatten = require('gulp-flatten'),         //拷贝文件不拷贝目录
    wiredep = require('wiredep').stream,       //动态引入bower
    rev = require('gulp-rev'),                  //- 对文件名加MD5后缀
    revcollector = require('gulp-rev-collector'), //- 路径替换
    replace = require('gulp-replace'),         //文本替换
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),  //实时保存刷新
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip'),                //压缩,打包
    ftpdeploy = require('ftp-deploy'),                 //上传ftp
    del = require('del'),                       //删除文件
    combiner = require("stream-combiner2");   //stream

// HTML处理
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    gulp.src('./src/views/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/views'));
});

// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/contents/**/*.css',
        cssDst = './dist/contents';

    gulp.src(cssSrc)      //压缩的文件
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())   //执行压缩
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst))   //输出文件夹

});

//编译sass
gulp.task('sass',function (){
    var sassSrc = './src/contents/**/*.scss',
        sassDst = './src/contents/';
    return gulp.src(sassSrc)
        .pipe(sass().on('error', sass.logError) )
        .pipe( gulp.dest(sassDst));
});

//合并js
gulp.task('scripts', function() {
    var base = './src/scripts/lib/';
    var jsSrc = [base+'jquery-1.11.3.min.js',
        base+'json2.js',
        base+'common.js',
        base+'jadann.db.manage.js',
        base+'user.db.js',
        base+'jadann.promptbox.js'
    ];
    return gulp.src(jsSrc)
        .pipe(concat('jadann.js'))
        .pipe(gulp.dest('./dist/scripts/lib/'));
});

// js处理
gulp.task('js', function () {
    var jsSrc = './src/scripts/*.js',
        jsDst ='./dist/scripts';

    var combined = combiner.obj([
        gulp.src(jsSrc)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(ngannotate())
            .pipe(ngmin({dynamic: false}))
            .pipe(rename({ suffix: '.min' }))
            .pipe(uglify())
            // .pipe(livereload(server))
            .pipe(gulp.dest(jsDst))
    ]);

    // 任何在上面的 stream 中发生的错误，都不会抛出，
    // 而是会被监听器捕获
    combined.on('error',console.error.bind(console));

    return combined;
});

// jslib处理:将bower_components目录下文件拷贝到src/js/lib下
gulp.task('bowerjslib', function () {
    gulp.src('bower_components/**/*.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./src/scripts/lib'));

});

// jslib处理:将src/js/lib目录下文件拷贝到dist/js/lib下
gulp.task('jslib', function () {
    gulp.src('./src/scripts/lib/**/*.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./dist/scripts/lib'));

});

// 清空dist
gulp.task('clean', function() {
    return gulp.src('/dist')
        .pipe(clean({force: true}));
});

//备份build目录下的旧版本打包文件
gulp.task('clean:build', function () {

    //备份旧文件
    gulp.src('build/*.tar.gz')
        .pipe(rename(function (path) {
            console.log(path);
            path.extname += ".old";
        }))
        .pipe(gulp.dest('build/old'))

    del(['build/*.tar.gz', '!build/old/*'])
});

//gizp压缩待发布文件
gulp.task('tar', function() {

    var date = new Date().getTime();

    gulp.src('dist/**/*')
        .pipe(tar('web_app_build_' + date + ".tar"))
        .pipe(gzip())
        .pipe(gulp.dest('build'))
});

//上传压缩包至ftp
gulp.task('ftp:deploy', function() {
    var ftpDeploy = new ftpdeploy();

    var config = {
        username: "open",
        password: "open123", // optional, prompted if none given
        host: "192.168.1.165",
        port: 21,
        localRoot: "build/",
        remoteRoot: "/dist/",
        exclude: ['*.old']
    }

    ftpDeploy.deploy(config, function(err) {
        if (err) console.log(err)
        else console.log('finished');
    })
});

//发布测试
gulp.task('dist:test', function() {
    var ftpDeploy = new ftpdeploy();

    var config = {
        username: "open",
        password: "open123", // optional, prompted if none given
        host: "192.168.1.165",
        port: 21,
        localRoot: "dist",
        remoteRoot: "/product/appdownload",
        exclude: ['*.old']
    }

    ftpDeploy.deploy(config, function(err) {
        if (err) console.log(err)
        else console.log('finished');
    })
});

//自动引入bower导入的库
gulp.task('bower', function () {
    gulp.src('./src/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./src'));
});


//修改引入的文件
gulp.task("replace", function () {
    var date = new Date().getTime();
    console.log(date);
    gulp.src('./dist/index.html')
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('.js', '.min.js'))
        .pipe(gulp.dest('./dist/'))
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听scss
        gulp.watch('./src/contents/**/*.scss',['sass']);

        // 监听css
        gulp.watch('./src/css/*.css', function(){
            gulp.run('css');
        });

        // 监听js
        gulp.watch('./src/scripts/**/*.js', function(){
            gulp.run('js');
        });

        gulp.watch('./src/scripts/lib/**/*.js', ['scripts','jslib']);


        // 监听bowerjslib
        gulp.watch('bower_components/**/*.min.js', function(){
            gulp.run('bowerjslib');
        });

        // 监听html
        gulp.watch('./src/**/*.html', function(event){
            gulp.run('html');
        })
    });
});

//整合 streams 来处理错误


// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('bowerjslib','js','jslib','scripts','sass','css','html','watch');
});

gulp.task('build', function(callback) {
    runsequence('clean','bowerjslib','js','jslib','scripts','sass','css','html','watch');
});

gulp.task('build:nowatch', function(callback) {
    runsequence('clean','bowerjslib','js','jslib','scripts','css','html');
});
