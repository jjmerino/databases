var db = require('./models/index');
var User = db.User;
var Message = db.Message;

exports.findAllMessages = function(cb){
  Message.findAll({include: [User] }).then(function(messages){
    cb(false,messages);
  });
};

exports.findUser = function(username, cb){
  User.find({where:{username:username}}).then(function(usr){
    var res = usr?[usr.values]:[];
    cb(false,res);
  });
};

exports.saveUser = function(username, cb){
  var newUser = User.build({username: username});
  newUser.save().then(function(usr) {
    cb([usr.values]);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  var newMessage = Message.build({message: message,UserId:userid,roomname:roomname});
  newMessage.save().then(function(msg) {
    cb([msg.values]);
  });
};
