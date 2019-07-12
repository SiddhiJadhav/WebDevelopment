var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name:"Panhala",image:"https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f4c378a1edb7b1_340.jpg"},
    {name:"Jotiba",image:"https://farm5.staticflickr.com/4101/4795779510_2cf15096f0.jpg"},
    {name:"Rankala",image:"https://farm1.staticflickr.com/582/21880054993_4d76411f78.jpg"},
    {name:"Panhala",image:"https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f4c378a1edb7b1_340.jpg"},
    {name:"Jotiba",image:"https://farm5.staticflickr.com/4101/4795779510_2cf15096f0.jpg"},
    {name:"Rankala",image:"https://farm1.staticflickr.com/582/21880054993_4d76411f78.jpg"},
    {name:"Panhala",image:"https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104491f4c378a1edb7b1_340.jpg"},
    {name:"Jotiba",image:"https://farm5.staticflickr.com/4101/4795779510_2cf15096f0.jpg"},
    {name:"Rankala",image:"https://farm1.staticflickr.com/582/21880054993_4d76411f78.jpg"}
]

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
 
    var  name = req.body.name;
    var image = req.body.image;
    newCampground = {name: name,image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.listen(3000,function(){
    console.log("YelpCamp server is online...")
});