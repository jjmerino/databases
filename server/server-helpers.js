

exports.collectData = function(request, cb){
  var data = "";
  request.on("data", function(chunk){
    data += chunk;
  });
  request.on("end", function(){
    cb(null, JSON.parse(data));
  });
};

exports.sendResponse = function(response, obj, status,raw){
  status = status || 200;
  var headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };
  if(!raw){
    headers['Content-Type'] = "application/json";
    response.writeHead(status, headers);
    var string = JSON.stringify(obj);
    response.end(string);

  }else{
    response.end(obj);
  }
};
