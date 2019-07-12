var mongoose = require("mongoose");
var passeordLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passeordLocalMongoose);

module.exports = mongoose.model("User",UserSchema);