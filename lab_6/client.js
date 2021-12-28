var x=0
function createTable(element,users) {
        const buttons = ['Delete', 'Update'];
        element.innerHTML = '';
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        table.append(tbody);
        table.classList.add('table','table-light','table-bordered','table-striped');
        element.append(table);
        for (let element of users) {
            const tr = document.createElement('tr');
            tbody.append(tr);
            let i=0;
            for(let key in element) {
                i+=1;
                const td = document.createElement('td');
                if(i==1){td.classList.add("firstrow");}
                td.innerHTML = element[key];
                tr.append(td);
            }
            for(const item of buttons) {
                const td = document.createElement('td');
                tr.append(td);
                const btn = document.createElement('button');
                const clBtn = item === 'Delete' ? 'btn-danger' : 'btn-warning';
                btn.classList.add('btn', clBtn);
                td.append(btn);
                btn.innerHTML = item;
                btn.onclick = (event) => {
                    const target = event.target;
                    if (target.innerHTML === 'Delete') {
                        const td = target.parentElement.parentElement.firstChild;
                        console.log(td.innerText);
                        deleteUser(td.innerText);
                    }
                    if (target.innerHTML === 'Update') {
                        const td = target.parentElement.parentElement.firstChild;
                        console.log(td.innerText);
                        updateUser(td.innerText);
                    }
                }
            }

        }

    }
    function getUsers(){
         $.get('/getusers',function(data){
         createTable(document.querySelector('.users-table'),data)
         })
    }
    function addUser(name,age){

     if(!name||!age) return;
     var obj={
     username:name,
     userage:age
     }
     $.post('/adduser',obj,function(data){
       console.log(data);
        getUsers();
        })
        }

function updateUser(id){
   $.get('/getusers',function(data){
     let user=data.find(x=>x._id===id);
     let {username, userage}=user;
     if(user){
       document.getElementById('inputName').value=username;
       document.getElementById('inputAge').value=userage;
       document.getElementById('formSubmit').value='Update';
     }
     x=user;
   })
   //alert("Update1");
}


function deleteUser(id){
   var obj={id:id};
   $.post('/deleteuser',obj,function(data){
   console.log(data);
    getUsers();
   })
 }

$('.add').click(function(){
     if(document.getElementById('formSubmit').value=="Add"){
     var name=$('.name').val();
     var age=$('.age').val();
     $('.name').val("");
     $('.age').val("");

     addUser(name,age);
   }
   else{
     //alert("Update");
       let user=x
       user.username=$('.name').val();
       user.userage=$('.age').val();
       console.log(user);
       $.post('/updateuser',user,function(data){
            getUsers();
            console.log(data);
        })
       $('.name').val("");
       $('.age').val("");
       document.getElementById('formSubmit').value='Add';
   }
 })


$(document).ready(function(){
  function getUsers(){
   $.get('/getusers',function(data){
   createTable(document.querySelector('.users-table'),data)
   })
   }
  getUsers();
})
