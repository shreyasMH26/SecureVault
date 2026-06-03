// AUTO LOGIN CHECK

if (
window.location.pathname.includes(
"dashboard.html"
)
) {

const loggedIn =
localStorage.getItem(
"loggedIn"
);

if (!loggedIn) {

window.location.href =
"index.html";

}

}

// ALREADY LOGGED IN

if (
window.location.pathname.includes(
"index.html"
)
) {

const loggedIn =
localStorage.getItem(
"loggedIn"
);

if (loggedIn) {

window.location.href =
"dashboard.html";

}

}

// LOGIN

function login() {

const username =
document.getElementById(
"username"
).value;

const password =
document.getElementById(
"password"
).value;

if (
username === "admin"
&&
password === "admin123"
) {

localStorage.setItem(
"loggedIn",
"true"
);

window.location.href =
"dashboard.html";

} else {

alert(
"Wrong username or password"
);

}

}

// LOGOUT

function logout() {

localStorage.removeItem(
"loggedIn"
);

window.location.href =
"index.html";

}
function toggleSidebar(){

document
.getElementById("sidebar")
.classList
.toggle("active");

}

document.addEventListener(
"DOMContentLoaded",
()=>{

let users =
JSON.parse(
localStorage.getItem(
"users"
)
|| "[]"
);

document.getElementById(
"userCount"
).textContent =
users.length;

document.getElementById(
"passwordCount"
).textContent =
users.length;

});// USER DATABASE

let users =
JSON.parse(
localStorage.getItem(
"users"
)
|| "[]"
);

// ADD USER

function addUser(){

const username =
document.getElementById(
"username"
).value;

const email =
document.getElementById(
"email"
).value;

if(
!username ||
!email
){
alert(
"Fill all fields"
);
return;
}

users.push({

id:Date.now(),

username,

email

});

saveUsers();

document.getElementById(
"username"
).value="";

document.getElementById(
"email"
).value="";

renderUsers();

}

// SAVE

function saveUsers(){

localStorage.setItem(
"users",
JSON.stringify(
users
)
);

}

// DELETE

function deleteUser(id){

users =
users.filter(
user =>
user.id !== id
);

saveUsers();

renderUsers();

}

// RENDER

function renderUsers(){

const tbody =
document.querySelector(
"#userTable tbody"
);

if(!tbody) return;

const search =
document
.getElementById(
"search"
)
.value
.toLowerCase();

tbody.innerHTML="";

users
.filter(user =>
user.username
.toLowerCase()
.includes(search)
)
.forEach(user=>{

tbody.innerHTML +=
`
<tr>

<td>
${user.username}
</td>

<td>
${user.email}
</td>

<td>

<button
onclick="
deleteUser(
${user.id}
)
">

Delete

</button>

</td>

</tr>
`;

});

}

// AUTO LOAD

document
.addEventListener(
"DOMContentLoaded",
renderUsers
);// PASSWORD GENERATOR

function updateLength(){

const slider =
document.getElementById(
"length"
);

if(!slider) return;

document.getElementById(
"lengthValue"
).textContent =
slider.value;

}

function generatePassword(){

const chars =

"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const length =

document.getElementById(
"length"
).value;

let password = "";

for(
let i=0;
i<length;
i++
){

password +=
chars.charAt(

Math.floor(
Math.random()
* chars.length
)

);

}

document.getElementById(
"password"
).value =
password;

checkStrength(
password
);

}

// STRENGTH

function checkStrength(
password
){

const bar =
document.getElementById(
"strengthBar"
);

bar.className = "";

if(
password.length < 8
){

bar.style.width =
"30%";

bar.classList.add(
"weak"
);

}
else if(
password.length < 14
){

bar.style.width =
"65%";

bar.classList.add(
"medium"
);

}
else{

bar.style.width =
"100%";

bar.classList.add(
"strong"
);

}

}

// COPY

function copyPassword(){

const password =

document.getElementById(
"password"
);

password.select();

navigator.clipboard
.writeText(
password.value
);

alert(
"Password Copied"
);

}

// SHOW / HIDE

function togglePassword(){

const password =

document.getElementById(
"password"
);

if(
password.type ===
"text"
){

password.type =
"password";

}else{

password.type =
"text";

}

}document.addEventListener("DOMContentLoaded", () => {

const chart = document.getElementById("userChart");

if(chart){

let users = JSON.parse(
localStorage.getItem("users")
|| "[]"
);

new Chart(chart,{

type:"doughnut",

data:{
labels:[
"Users",
"Remaining"
],

datasets:[{

data:[
users.length,
100-users.length
]

}]
}

});

}

});function toggleTheme(){

document.body.classList.toggle(
"light-mode"
);

localStorage.setItem(
"theme",
document.body.classList.contains(
"light-mode"
)
);

}if(
localStorage.getItem("theme")
==="true"
){

document.body.classList.add(
"light-mode"
);

}function exportJSON(){

let users =
localStorage.getItem(
"users"
);

const blob =
new Blob(
[users],
{
type:"application/json"
}
);

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"users.json";

a.click();

showToast(
"JSON Exported"
);

}function importJSON(event){

const file =
event.target.files[0];

const reader =
new FileReader();

reader.onload =
function(e){

localStorage.setItem(
"users",
e.target.result
);

showToast(
"Imported Successfully"
);

};

reader.readAsText(file);

}function exportCSV(){

let users =
JSON.parse(
localStorage.getItem(
"users"
)
|| "[]"
);

let csv =
"Username,Email\n";

users.forEach(user=>{

csv +=
`${user.username},
${user.email}\n`;

});

const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"users.csv";

a.click();

showToast(
"CSV Exported"
);

}function showToast(msg){

const toast =
document.createElement("div");

toast.className =
"toast";

toast.innerText =
msg;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},3000);

}if("serviceWorker" in navigator){

navigator.serviceWorker.register(
"service-worker.js"
);

}logActivity(
"User Added: " + username
);logActivity(
"User Deleted"
);function logActivity(action){

let logs =
JSON.parse(
localStorage.getItem(
"logs"
)
|| "[]"
);

logs.push({

action,

time:new Date()
.toLocaleString()

});

localStorage.setItem(
"logs",
JSON.stringify(logs)
);

}let logs =
JSON.parse(
localStorage.getItem(
"logs"
)
|| "[]"
);

const list =
document.getElementById(
"activityList"
);

if(list){

logs
.slice(-5)
.reverse()
.forEach(log=>{

list.innerHTML +=
`
<li>

${log.action}

<br>

<small>

${log.time}

</small>

</li>
`;

});

}document.addEventListener(
"keydown",
e=>{

if(
e.ctrlKey &&
e.key==="u"
){

window.location.href=
"users.html";

}

if(
e.ctrlKey &&
e.key==="g"
){

window.location.href=
"generator.html";

}

if(
e.ctrlKey &&
e.key==="d"
){

window.location.href=
"dashboard.html";

}

}
);function changeAccent(){

const color =

document.getElementById(
"themeColor"
).value;

document.documentElement
.style.setProperty(
"--accent",
color
);

localStorage.setItem(
"accent",
color
);

}const savedAccent =

localStorage.getItem(
"accent"
);

if(savedAccent){

document.documentElement
.style.setProperty(
"--accent",
savedAccent
);

}function addUser() {
   
}

function saveUsers() {
   const users = JSON.parse(localStorage.getItem("users") || "[]");
}

function renderUsers() {
   const userList = document.getElementById("userList");
   userList.innerHTML = "";

   let users = JSON.parse(localStorage.getItem("users") || "[]");

   users.forEach(user => {
       const li = document.createElement("li");
       li.innerText = `${user.username} - ${user.email}`;
       userList.appendChild(li);
   });
}