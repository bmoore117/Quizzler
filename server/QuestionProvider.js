QuestionProvider = function(db) {
  console.log("Instantiating QuestionProvider");
  this.db = db;
};

QuestionProvider.prototype.findById = function(id, callback) {
  this.db.collection('questions', function(error, questions) {
    if(error) callback(error);
    else {
      questions.findOne({_id: Number(id)}, function(error, result) {
        if(error) callback(error);
        else callback(null, result);
      });
    }
  });
}

QuestionProvider.prototype.findMaxId = function(callback) {
  this.db.collection('questions', function(error, questions) {
    if(error) callback(error);
    else {
      questions.findOne({}, {fields:{_id:1}, sort:{_id:-1}}, function(error, result) {
        if(error) callback(error);
        else callback(null, result);
      });
    }
  });
}

QuestionProvider.prototype.findAll = function(callback) {
  this.db.collection('questions', function(error, questions) {
    if(error) callback(error);
    else {
      questions.find().sort({_id:1}).toArray(function(error, result) {
        if(error) callback(error);
        else callback(null, result);
      });
    }
  });
}

exports.QuestionProvider = QuestionProvider;
