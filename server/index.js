var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    auth = require('basic-auth'),
    expressJWT = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    mongodb = require('mongodb');

var db = new mongodb.Db('quizzler', new mongodb.Server('localhost', 27017, {auto_reconnect: true}, {}));
db.open(function(){});

var UserProvider = require('./UserProvider').UserProvider;
var userProvider = new UserProvider(db);

var QuestionProvider = require('./QuestionProvider').QuestionProvider;
var questionProvider = new QuestionProvider(db);

var app = express();
var rootDir = __dirname + '/';
var staticRoot = express.static(rootDir);
app.use(staticRoot);

var secret = 'a;sdfgioays8yA:DFa;w4w;eADgaslkfjg8loYASD??:SOEyt';
app.use(expressJWT({secret: secret}).unless({path: ['/api/login', '/*']}));

// TODO implement secure storage of passwords
app.post('/api/login', function(req, res) {
  var credential = auth(req);
  console.log("Attempting to authenticate user: " + credential.name);

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
         //case where user object not found
        if(!user) {
          res.statusCode = 401;
          res.end('Username / password not recognized');
        } else {
           //case where user object doesn't match
          if(user.username !== credential.name || user.password !== credential.pass) {
            res.statusCode = 401;
            res.end('Username / password not recognized');
          } else {
            var d = new Date();
            var seconds = Math.round(d.getTime() / 1000);
            var expiry = seconds + 14400; //4 hrs from now
            var token = jwt.sign({username: user.username, exp: expiry}, secret);
            res.status(200).json(token);
          }
        }
      }
    });
  }
});

app.get('/api/question/:id', function(req, res) {
  console.log('Fetching question with id: ' + req.params.id);

  questionProvider.findById(req.params.id, function(error, question) {
    if(error) {
      res.statusCode = 500;
      res.end(error.toString());
    } else {
      if(!question) {
        res.statusCode = 404;
        res.end("Question not found");
      } else {
        res.status(200).json(question);
      }
    }
  })
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.listen(3000, function() {
    console.log('app running on port', 3000);
});
