var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    expressJWT = require('express-jwt'),
    jwksRsa = require('jwks-rsa'),
    mongodb = require('mongodb');

var db = new mongodb.Db('quizzler', new mongodb.Server('localhost', 27017, {auto_reconnect: true}, {}));
db.open(function(){});

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

app.get('/api/question/max', function(req, res) {
  console.log('Fetching max question id');

  questionProvider.findMaxId(function(error, maxId) {
    if(error) {
      res.statusCode = 500;
      res.end(error.toString());
    } else {
      if(!maxId) {
        res.statusCode = 404;
        res.end("Max id not found"); // collection empty
      } else {
        res.status(200).json(maxId);
      }
    }
  })
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

app.get('/api/score', function(req, res) {
  console.log('Calculating final score');

  questionProvider.findAll(function(error, questions) {
    if(error) {
      res.statusCode = 500;
      res.end(error.toString());
    } else {
      if(!questions || questions.length == 0) {
        res.statusCode = 404;
        res.end("No questions found; database empty");
      } else {
        console.log(questions);
        var submission = JSON.parse(req.query.submission);
        var result = {score: 0, incorrect:[]};
        var totalCorrect = 0;

        for (var i = 0; i < submission.length; i++) {
          var answer = submission[i];
          var correct = true;

          for(var j = 0; j < answer.answers.length; j++) {
            if(answer.answers[j] !== questions[i].correctAnswers[j]) {
              correct = false;
              break;
            }
          }

          if(correct) {
            totalCorrect++;
          } else {
            result.incorrect.push({selected: answer.answers, question: questions[i]});
          }
        }

        result.score = totalCorrect / questions.length;
        res.status(200).json(result);
      }
    }
  });
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
