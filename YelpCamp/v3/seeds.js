var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");


var data=[
    {
        name:"kolhapur",
        image:"https://images.unsplash.com/photo-1544343563-d3a8f0b6e6ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Ekadam Kadak"
    },
    {
        name:"Kashmir",
        image:"https://images.unsplash.com/photo-1533031062030-87f11462d6f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Heaven on earth"
    },
    {
        name:"Kerala",
        image:"https://images.unsplash.com/photo-1512206317687-1bde496dbe25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"God's own country"
    }

]

function seeddb(){

    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed campgrounds");

            //add some campgrounds
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("campground added");

                        //add comment
                        Comment.create(
                            {
                                text:"One of the best places in India",
                                author:"Swatha Siddhi"
                            },function(err,comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("comment added");
                                }
                            }
                            )
                    }
                })
            })
           
        }
    });


}

module.exports = seeddb();