var mongoose=require('../mongoose.js');
var schemaUser=new mongoose.Schema({
 username:{
 type:String,
 unique:true,
 required:true
 },
 userage:{
 type:Number,
 required:true,
 min:18,
 max:70
}
}, {versionKey:false})
var User=mongoose.model("User",schemaUser);
module.exports=User;
