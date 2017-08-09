UserProvider = function(db) {
  console.log("Instantiating UserProvider");
  this.db = db;
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
      users.findOne({username: name}, function(error, result) {
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
