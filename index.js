var gulp = require('gulp'),
    zip = require('gulp-zip'),
    del = require('del'),
    install = require('gulp-install'),
    awsLambda = require('node-aws-lambda'),
    envify = require('gulp-envify'),
    _ = require('lodash'),
    path = require('path');

module.exports = function(gulp) {

    gulp.task('clean', function(cb) {
        return del(['./dist', './dist.zip'], cb);
    });

    gulp.task('js', function() {
        return gulp.src(['src/**/*', '!src/**/*.spec.js'])
            .pipe(envify(process.env))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('node-mods', function() {
        return gulp.src('./package.json')
            .pipe(gulp.dest('dist/'))
            .pipe(install({
                production: true
            }));
    });

    gulp.task('zip', function() {
        return gulp.src(['dist/**/*', '!dist/package.json'])
            .pipe(zip('dist.zip'))
            .pipe(gulp.dest('./'));
    });

    gulp.task('upload', function(callback) {
        var packageDefinition = require(path.join(process.cwd(), './package.json'))
        var lambdaConfig = packageDefinition.lambda;
        console.log('arn:aws:iam::' + process.env.AWS_ACCOUNT_ID + ':role/' + (packageDefinition.lambda.role || 'aws-lambda-default'))
        // set defaults
        _.defaultsDeep(lambdaConfig, {
            region: 'us-east-1',
            handler: 'index.handler',
            description: "",
            role: 'arn:aws:iam::' + process.env.AWS_ACCOUNT_ID + ':role/' + (packageDefinition.lambda.role || 'aws-lambda-default'),
            timeout: 180,
            memorySize: 512
        });

        awsLambda.deploy(
            './dist.zip', lambdaConfig,
            callback);
    });
};
