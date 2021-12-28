//підключаєм express і створюємо app
const express=require('express');
const path=require('path');
const app=express();

//підключаєм Mongo базу
const config = require('../../config')
const mongoose = require('mongoose');

_connectDB()

//підключаєм модуль body-parser і інтегруєм в express
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//задаєм папку для статичного контенту

const staticPath = path.resolve(__dirname, '..', '..');
app.use(express.static(staticPath));

const cookieParser=require('cookie-parser')();
app.use(cookieParser);

const session = require('cookie-session')({keys:['secret'], maxAge:2*60*60*1000});
app.use(session);

const passport = require('./passport.js');
app.use(passport.initialize({}))
app.use(passport.session({}));

require('./socket.io')(app, cookieParser, session);

const authenticateUser = passport.authenticate(
  'local',{
    successRedirect:'/',
    failureRedirect:'/login'
  });

const isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated && req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

//перевірка чи user автентифікований
app.get('/', isAuthenticated);

//опрацювання кореневого шляху
app.get('/', function(req,res){
  console.log("req.user:", req.user);

  const filePath = path.resolve(__dirname, '..', 'Client', 'chat.html');
  res.sendFile(filePath);
});

//запуск процедури автентифікації
app.post('/login', authenticateUser);
app.get('/login',function(req,res){
  const filePath = path.resolve(__dirname, '..', 'Client', 'login.html');
  res.sendFile(filePath);
});

function _connectDB() {
  mongoose.connect('mongodb+srv://Mary:qjhr@cluster0.zlxb1.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const { connection } = mongoose;

  connection.on('error', err => {
    console.log(err);
  });
}
