var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

//Adding campground

// Campground.create({
//     name:"Rankala",
//     image:"https://farm1.staticflickr.com/582/21880054993_4d76411f78.jpg",
//     description:"Beautiful and large lake in Kolhapur city..."
//     },function(err,Campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Added Succesfully");
//         console.log(Campground);
//     }
// });

//INDEX-Landing page
app.get("/",function(req,res){
    res.render("landing");
});

//Showing all campgrounds
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allCampgrounds});      
        }
    });
});

//CREATE-add new campground to DB
app.post("/campgrounds",function(req,res){
 
    var  name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    newCampground = {name:name, image:image, description:desc};
    
    Campground.create(newCampground,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");      
        }
    });
    
});

//NEW-Show form to create campground
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

//SHOW-show more info about campground
app.get("/campgrounds/:id",function(req,res){
   Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:foundCampground});
            // console.log(foundCampground);
        }
   });

});

app.listen(3000,function(){
    console.log("YelpCamp server is online...")
});