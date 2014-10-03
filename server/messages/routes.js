var express = require('express');
var router = express.Router();

var messages = {
};

router.get('/classes/:room', function(req, res) {
  var base = req.params.room || 'lobby'
  res.send(200, {results: messages[base] });
});

router.post('/classes/:room', function(req, res) {
  var roomname = req.params.room || 'lobby'
  var ret = "";

  req.on('data',function(chunk){
    ret += chunk;
  });

  req.on('end',function(){
    var obj = JSON.parse(ret);
    var newObj = {
      createdAt: (new Date()).toISOString(),
      objectId: Math.floor(Math.random() * 9999999).toString(16),
      message: obj.message,
      username: obj.username,
      roomname: obj.roomname
    };
    messages[roomname] = messages[roomname] || [];
    messages[roomname].unshift(newObj);
    res.send(201, {results: messages[roomname]});
  });
});

module.exports = router;
