var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

UserProvider = function(host, port) {
  console.log("Creating DB");
  this.db = new Db('quizzler', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

UserProvider.prototype.getCollection = function(callback) {
  this.db.collection('users', function(error, users) {
    if( error ) callback(error);
    else callback(null, users);
  });
};

UserProvider.prototype.findByName = function(name, callback) {
  this.getCollection(function(error, users) {
    if(error) callback(error);
    else {
      users.findOne({name: name}, function(error, result) {
        if(error) callback(error);
        else callback(null, result);
      });
    }
  });
}

UserProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, users) {
    if(error) callback(error);
    else {
      users.find().toArray(function(error, result) {
        if(error) callback(error);
        else callback(null, result);
      });
    }
  });
}

exports.UserProvider = UserProvider;
