var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

var express = require("express");
var router = express.Router();

var helpers = require('./http-helpers.js');


archive.makeIndex();

router.get('/test',function(req,res){
  archive.readListOfUrls(function(list){

    res.send(list);

  });
})
router.get('/sites/:domain',function(req,res){
    var domain = req.params.domain;
    archive.getDocumentForDomain(domain, function(doc){
      if(doc&&doc.data){
        res.send(doc.data);
      }else{
        res.redirect(302,'/loading.html');
      }
    })

})
// lol, deleted everything
router.post('/',function(req,res){
  var domain = req.body.url;
  archive.isUrlInList(domain,function(exists){
  if(exists){
    // redirect to our get.
    archive.getDocumentForDomain(domain, function(doc){
      if(doc&&doc.data){
        res.redirect(302,'/sites/'+domain);
      }else{
        res.redirect(302,'/loading.html');
      }
    })
  }else{

      console.log("not even close");
    // create it! (add it to the archive)
    archive.addUrlToList(domain,function(){
      res.redirect(302,'/loading.html');
    });
  }
 });
});


module.exports = router;
