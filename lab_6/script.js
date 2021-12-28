var User=require('./user');
var user=new User('Den','H');
console.log('firstname: '+user.first);
console.log('lastname: '+user.last);
user.fullName();
