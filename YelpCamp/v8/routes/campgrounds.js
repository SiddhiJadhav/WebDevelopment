var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");


//Showing all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});      
        }
    });
});

//CREATE-add new campground to DB
router.post("/",function(req,res){
 
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
router.get("/new",function(req,res){
    res.render("campgrounds/new.ejs");
});

//SHOW-show more info about campground
router.get("/:id",function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
            // console.log(foundCampground);
        }
   });

});

module.exports = router;