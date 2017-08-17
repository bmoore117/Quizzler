var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    expressJWT = require('express-jwt'),
    jwksRsa = require('jwks-rsa'),
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

const checkJwt = expressJWT({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://bmoore.auth0.com/.well-known/jwks.json'
  }),
  algorithms: ['RS256']
});

app.use('/api', checkJwt);

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

app.get('*', function(req, res) {
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
