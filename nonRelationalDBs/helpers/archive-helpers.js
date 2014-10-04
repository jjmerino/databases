var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var q = require('q');
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1',27017,{});
var client = new mongodb.Db('test',server);
var archiveCollection=[];
var watchers = [];
client.open(function(){
  console.log('connected to mongo!');

    client.createCollection('archive',function(err,collection){
      archiveCollection = collection;

      for(var i = 0; i<watchers.length; i++){
        watchers[i]();

      }

    });
});
exports.onReady = function(cb){
  watchers.push(cb);
};
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
var paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

var index = {};


exports.paths = paths;


// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
    archiveCollection.find().toArray(function(err,arr){
      cb(arr);
    });
};

exports.isUrlInList = function(domain,cb) {
  archiveCollection.find({domain:domain}).toArray(function(err,arr){
    console.log(arr);
    if(arr.length > 0){
      cb(true);

    }else{
      cb(false);
    }
  });
};

exports.getDocumentForDomain = function(domain,cb){
  archiveCollection.find({domain:domain}).toArray(function(err,arr){
    if(arr.length > 0){
      cb(arr[0]);

    }else{
      cb(null);

    }
  })
}

exports.addUrlToList = function(domain,callback) {
  exports.isUrlInList(domain,function(exists){
    if(!exists){
      archiveCollection.insert({domain:domain,data:null});
      callback();
    }
  })
};

exports.isURLArchived = function(domain,callback){
  archiveCollection.find({domain:domain}).toArray(function(err,arr){
    if(arr.length > 0 && arr[0].data){
      callback(true);
    }else{
      callback(false);
    }
  });
};

exports.downloadUrls = function(){

};

exports.archiveUrl = function(url,data,timestamp){
  //create the file name 'url'
  //write data to the file
  var d = q.defer();
  archiveCollection.update({domain:url},{domain:url,data:data},function(err,arr){
    console.log(data);
  });


  //for extra credit (in the future) append a timestamp to the name? dunno!

  return d.promise;
}
// archiveUrl().then(function(data){ // Success!!!};)
exports.makeIndex = function(){
  fs.readFile(paths.list,{encoding:'utf8'},function(err,data){
    if(err) throw err;
    var lines = data.split('\n');
    var found = false;
    for(var i = 0; i < lines.length; i++){
      index[lines[i]] = i;
    }
    console.log('Successfully populated index!');
  });
};

//addUrlToList
//exports.addDomain =

//isUrlArchived
// exports.isArchived =

//isUrlInList
// exports.hasDomain =
