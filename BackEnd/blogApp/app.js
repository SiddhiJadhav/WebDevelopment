var express = require("express"),
methodOverride = require("method-override"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));


var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
//     title:"Dog",
//     image:"https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body:"Beautiful dog"
// });


app.get("/",function(req,res){
    res.redirect("/blogs");
});

//Index
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs: blogs});
        }
    }); 
});

//New
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//Create
app.post("/blogs",function(req,res){
    
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });

});

//Show
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    })
});

//Edit
app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,foundblog){
        if(err){
            res,redirect("/blogs");
        }else{
            res.render("edit",{blogs:foundblog});
        }
    })
});

//Update
app.put("/blogs/:id",function(req,res){

    req.body.blog.body=req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlolg){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs"+req.params.id);
        }
    })
});

//Delete
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
});

app.listen(3000,function(){
    console.log("Server is online...");
});
