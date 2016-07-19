var express = require('express');
var useragent = require('express-useragent');

var app = express();
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/public'));
app.use(useragent.express());

app.get('/whoami', function (req, res) {
  
  var ret_val = {
    ip: req.get('x-forwarded-for'),
    language: req.acceptsLanguages()[0],
    operating_system: req.useragent.os,
  };
  
  res.send(ret_val);
});

// render instructions file by default
app.use(function(req, res, next){
  // respond with json
  // res.send({ error: 'Not found' });

  var baseurl = req.protocol + '://' + req.get('host');
  res.render('index', {
    baseurl: baseurl
  });
});

// ref: http://stackoverflow.com/a/15693371
// Heroku dynamically assigns your app a port,
// so you can't set the port to a fixed number.
// Heroku adds the port to the env, so you can pull
// it from there.
var appPort = process.env.PORT || 8080;
app.listen(appPort, function () {
  console.log('App listening on port ' + appPort);
});