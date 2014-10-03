"use strict";

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
var db        = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Message = sequelize.define('Message',{
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
});

db.User = sequelize.define('User', {
  username: Sequelize.STRING
});
db.User.hasMany(db.Message);
db.Message.belongsTo(db.User);

module.exports = db;
