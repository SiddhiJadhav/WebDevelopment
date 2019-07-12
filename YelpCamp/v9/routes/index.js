var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");


//INDEX-Landing page
router.get("/",function(req,res){
    res.render("landing");
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Auth routes
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Sign up
router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
   
    //console.log(req.body);

    newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("campgrounds");
        });
    });   
});

//Login
router.get("/login",function(req,res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}) ,function(req,res){

});

//Logout
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds")
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
