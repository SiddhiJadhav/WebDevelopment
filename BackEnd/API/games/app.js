var express = require("express");
var app = express();

var music = require('musicmatch')({apikey:"bb3fc2d6f79efee2770303d91333d38e"});

var request = require("request");

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("form.ejs");
});

app.get("/result",function(req,res){
  music.trackLyrics({track_id:15445219})
  .then(function(data){
      var res = JSON.parse(data);
     res.render("result",{res: data});
  });

});


app.listen(3000,function(){
    console.log("Game server is online...");
});