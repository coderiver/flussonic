var gulp  = require('gulp');
var util = require('gulp-util');
var config = require('../config');
sendmail = require('gulp-mailgun');
email = require('gulp-email');

gulp.task('mail', function () {
	
	em = (util.env.email ? util.env.email : 'kakuz34@gmail.com');
	console.log(em);
  gulp.src( 'build/index.html') // Modify this to select the HTML file(s)
  .pipe(sendmail({
    key: 'pubkey-d0f476a670e037df94a4872b7c954139', 
    sender: 'from@test.com',
    recipient: 'kakuz34@gmail.com',
    subject: 'This is a test email!!!!'
  }));
});


var options = {
       user: 'api:key-a12658a24799e13a7f50e297ad04f2c9',
       url: 'https://api.mailgun.net/v3/sandboxd98e02d93b9943b19af0a5cdd491a12f.mailgun.org',
       form: {
           from: 'John Doe <John.Doe@gmail.com>',
           to: 'akella <kakuz34@gmail.com>',
           subject: 'The last dist!!!'
       }
   };

   gulp.task('test', function () {
       return gulp.src(['build/index.html'])
           .pipe(email(options));
   });