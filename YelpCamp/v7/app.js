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

var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
    

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

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function(){
    console.log("YelpCamp server is online...")
});