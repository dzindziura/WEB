function User(first,last){
    this.first=first;
    this.last=last;
   }
   User.prototype.fullName=function(){
    console.log('fullname: '+this.first+" "+this.last)
   }
   module.exports=User; 
   
