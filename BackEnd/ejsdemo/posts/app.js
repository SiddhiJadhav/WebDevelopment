var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req, res){
    res.render("home");
});

app.get("/fallin/:thing/from/:years",function(req, res){
    var thing = req.params.thing;
    var years = req.params.years;
    res.render("loves",{thingVar: thing,yearsTo: years});
});

app.get("/posts",function(req,res){
    var post = [
        {title:"one", author:"1"},
        {title:"two", author:"2"},
        {title:"three", author:"3"},
    ];

    res.render("posts",{post:post});
});

app.listen(3000,function(){
    console.log("Server is online");
});