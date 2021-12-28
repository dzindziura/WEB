var User=require('./models/user.js');
var express=require('express');
var app=express();
app.use(express.static(__dirname));
app.get('/',function(req,res){
 res.sendFile(__dirname+'/index.html');
})

app.listen(process.env.PORT||8088);

console.log('Run server!');

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var fs=require('fs');

app.get('/getusers',function(req,res){
 User.find(function(err,data){

 res.send(data);
 })
})

app.post('/adduser',function(req,res){

 var user=new User(req.body);
 user.save(function(err,data){
 if(err) console.log(err.message);

 res.send(data);
 })
})

app.post('/deleteuser',function(req,res){
 User.remove({_id:req.body.id},function(err,data){
 res.send("remove user");
 })
})

app.post('/updateuser',function(req,res){
    console.log(req.body);
    console.log('\n');
    User.findByIdAndUpdate(req.body._id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('User udpated.');
    });
})
