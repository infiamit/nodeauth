var mongoose= require("mongoose");
mongoose.connect('mongodb://localhost:27017/nodeauth' ,{ useNewUrlParser: true });
var db= mongoose.connection;
var userSchema= mongoose.Schema({
username:{
    type: String,
    index: true,
    unique: true
},
password: {
    type: String
},
email:{
    type:String
},
address:{
    type:String
} 
});

var User= module.exports = mongoose.model('User', userSchema);


