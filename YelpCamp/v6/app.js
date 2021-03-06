   var express       = require("express"),
       app           = express(),
       bodyParser    = require("body-parser"),
       mongoose      = require("mongoose"),
       passport      = require("passport"),
       LocalStrategy = require("passport-local"), 
       Campground    = require("./models/campgrounds"),
       seeddb        = require("./seeds"),
       User          = require("./models/user"),
       Comment       = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp_v6",{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Passport canfig
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

app.use(require("express-session")({
    secret:"Discipline is root of good qualities",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})

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
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});      
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
    res.render("campgrounds/new.ejs");
});

//SHOW-show more info about campground
app.get("/campgrounds/:id",function(req,res){
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
            // console.log(foundCampground);
        }
   });

});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Comments
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new",{campground:campground});
        }
    });

});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();res.redirect("/campgrounds/"+campground._id)
                }
            })
        }
    });
   
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Auth routes
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Sign up
app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
   
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
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login", passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}) ,function(req,res){

});

//Logout
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds")
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000,function(){
    console.log("YelpCamp server is online...")
});