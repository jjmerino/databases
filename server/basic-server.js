/* Import node's http module: */
var routes = require('./messages/routes');
var express = require('express');
var app = express();
var port = 3000;

app.use('/', routes);
app.get(/^(.+)$/, function(req, res) {
  res.sendfile('./client' + req.params[0]);
});

app.listen(port);
