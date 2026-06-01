
function genPass(){
 const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
 let p='';
 for(let i=0;i<14;i++) p+=chars[Math.floor(Math.random()*chars.length)];
 return p;
}
let users=JSON.parse(localStorage.getItem('users')||'[]');

function addUser(){
 let u=document.getElementById('username').value;
 if(!u)return;
 users.push({user:u,password:genPass()});
 localStorage.setItem('users',JSON.stringify(users));
 document.getElementById('username').value='';
 renderUsers();
}

function del(i){
 users.splice(i,1);
 localStorage.setItem('users',JSON.stringify(users));
 renderUsers();
}

function copyPass(p){
 navigator.clipboard.writeText(p);
 alert('Copied');
}

function renderUsers(){
 let q=(document.getElementById('search')?.value||'').toLowerCase();
 let tbody=document.getElementById('users');
 tbody.innerHTML='';
 users.filter(x=>x.user.toLowerCase().includes(q)).forEach((u,i)=>{
 tbody.innerHTML += `<tr>
 <td>${u.user}</td>
 <td>${u.password}</td>
 <td>
 <button onclick="copyPass('${u.password}')">Copy</button>
 <button onclick="del(${i})">Delete</button>
 </td></tr>`;
 });
}

function exportJSON(){
 const blob=new Blob([JSON.stringify(users,null,2)],{type:'application/json'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='users.json';
 a.click();
}
renderUsers();
