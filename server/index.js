var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    auth = require('basic-auth');

var UserProvider = require('./UserProvider').UserProvider;
var userProvider = new UserProvider('localhost', 27017);

var app = express();

app.post('/api/login', function(req, res) {
  var credential = auth(req);

  if(!credential || !credential.name || !credential.pass) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  } else {
    userProvider.findByName(credential.name, function(error, user) {
      if(error) {
        res.statusCode = 500;
        res.end('Internal error');
      } else {
        console.log(user);
        if(!user) {
          res.statusCode = 401;
          res.end('Username / password not recognized');
        } else {
          res.end("Access granted");
        }
      }
    });
  }

  /* console.log("Username " + credential.name + " password " + credential.pass);

  userProvider.findAll(function(error, users) {
    res.send(users);
  }) */
});

var staticRoot = __dirname + '/';
app.use(express.static(staticRoot));
app.use(function(req, res, next) {
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    console.log("Accepts " + accept);
    if(accept !== 'html') {
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    console.log("Ext " + ext);
    if (ext !== '') {
        return next();
    }
    fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

app.listen(3000, function() {
    console.log('app running on port', 3000);
});
