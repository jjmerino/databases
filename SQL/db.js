var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  dbConnection.query('SELECT m.*,u.username as username FROM messages as m JOIN users as u ON u.id = m.user_id ', function(err, rows, fields) {
    if (err) throw err;

    cb(err,rows);
  });

};

exports.findUser = function(username, cb){
  dbConnection.query('SELECT * FROM users WHERE username = ?',[username], function(err, rows, fields) {
    if (err) throw err;

     cb(err,rows);

  });
};

exports.saveUser = function(username, cb){
  dbConnection.query('INSERT INTO users (name,username) values(?,?)',[username, username], function(err, rows, fields) {
    if (err) throw err;
    cb([{id:rows.insertId}]);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query('INSERT INTO messages (message,user_id,roomname) values(?,?,?)',[message, userid, roomname], function(err, rows, fields) {
    if (err) throw err;
    cb([{id:rows.insertId}]);
  });
};
