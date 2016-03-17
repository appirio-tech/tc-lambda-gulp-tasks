# aws-lambda-gulp-tasks

Simply exposes the tasks from https://github.com/ThoughtWorksStudios/node-aws-lambda as gulp tasks

## Usage

    npm install gulp --save-dev
    npm install run-sequence --save-dev
    npm install aws-lambda-gulp-tasks --save-dev

gulpfile.js :
````js
var gulp = require('gulp');
var runSequence = require('run-sequence');
require('aws-lambda-gulp-tasks')(gulp);

gulp.task('deploy', function(callback) {
  return runSequence(
    ['clean'],
    ['js', 'node-mods'],
    // ADD ANY FILE YOU WANT TO THE dist/ folder
    ['zip'],
    ['upload'],
    callback
  );
});
````

lambda-config.js :
````js
module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  handler: 'index.handler',
  role: process.env.AWS_LABMDA_ROLE_ARN,
  functionName: <function name>,
  timeout: 10,
  memorySize: 128,
  eventSource: { // optional
    EventSourceArn: <event source such as kinesis ARN>,
    BatchSize: 200,
    StartingPosition: "TRIM_HORIZON"
  }
}
````

In your repository :

    $ gulp deploy

## Gulp tasks made available

 * clean
 * js
 * node-mods
 * zip
 * upload

 * deploy (the full process) is given in the example above (but customizable)




# License

(The MIT License)

Copyright (c) 2015 Eric Abouaf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
