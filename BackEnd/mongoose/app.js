var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
var catSchema = new mongoose.Schema({
    name:String,
    age:Number

});

var Cat = mongoose.model("Cat",catSchema);

// var aboli = new Cat({
//     name:"Aboli",
//     age:11
// });

// aboli.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong");
//     }else{
//         console.log(cat);
//     }

// });

// Cat.create({
//     name:"shavya",
//     age:2
// },function(err,cat){
//     if(err){
//         console.log("something went wrong");
//         console.log(err);
//     }else{
//         console.log(cat);
//     }

// });

Cat.find({},function(err,cats){
    if(err){
        console.log("something went wrong");
        console.log(err);
    }else{
        console.log(cats);
    }
});