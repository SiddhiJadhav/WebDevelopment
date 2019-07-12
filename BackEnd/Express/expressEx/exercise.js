var express = require("express");

var app = express();

app.get("/",function(req, res){
    res.send("Hi there, welcome to my assignment.")
});

app.get("/speak/:animal",function(req, res){
    var sounds = {
        pig:"oink",
        dog:"bhau",
        cat:"meow",
        fish:"..."
    }
    var animalName = req.params.animal.toLowerCase();
    var sound = sounds[animalName];
    res.send("the "+animalName+" says "+sound);
});

app.get("/repeat/:msg/:no",function(req,res){

    var msg = req.params.msg;
    var no = Number(req.params.no);
    var result="";

    for(var i=0;i<no;i++)
    {
        result+=msg +" ";
    }
    res.send(result);

});






app.get("*",function(req, res){
    res.send("Sorry, page not found.")
});


app.listen(3000);