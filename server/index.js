var express = require('express'),
    path = require('path'),
    fs = require('fs');

var UserProvider = require('./UserProvider').UserProvider;
var userProvider = new UserProvider('localhost', 27017);

var app = express();
var staticRoot = __dirname + '/';

app.get('/api/user', function(req, res) {
  console.log("Fetching users");
  userProvider.findAll(function(error, users) {
    res.send(users);
  })
});

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
