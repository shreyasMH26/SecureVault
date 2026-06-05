// ==========================
// AUTH SYSTEM
// ==========================

if (window.location.pathname.includes("dashboard.html")) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        window.location.href = "index.html";
    }
}

if (window.location.pathname.includes("index.html")) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn) {
        window.location.href = "dashboard.html";
    }
}

function login() {

    const username =
        document.getElementById("username")?.value;

    const password =
        document.getElementById("password")?.value;

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        showToast("Login Successful");

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "Wrong Username or Password"
        );

    }

}

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
        "index.html";

}

// ==========================
// USER DATABASE
// ==========================

let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];

// SAVE USERS

function saveUsers() {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}

// ADD USER

function addUser() {

    const username =
        document.getElementById("username")
        ?.value
        .trim();

    const email =
        document.getElementById("email")
        ?.value
        .trim();

    if (!username || !email) {

        alert(
            "Fill all fields"
        );

        return;

    }

    users.push({

        id: Date.now(),

        username,

        email

    });

    saveUsers();

    document.getElementById(
        "username"
    ).value = "";

    document.getElementById(
        "email"
    ).value = "";

    renderUsers();

    updateDashboard();

    showToast(
        "User Added"
    );

}

// DELETE USER

function deleteUser(id) {

    users =
        users.filter(
            user =>
                user.id !== id
        );

    saveUsers();

    renderUsers();

    updateDashboard();

    showToast(
        "User Deleted"
    );

}

// SEARCH + RENDER USERS

function renderUsers() {

    const tbody =
        document.querySelector(
            "#userTable tbody"
        );

    if (!tbody) return;

    const searchInput =
        document.getElementById(
            "search"
        );

    const search =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";

    tbody.innerHTML = "";

    users
        .filter(user =>
            user.username
                .toLowerCase()
                .includes(search)
        )
        .forEach(user => {

            tbody.innerHTML += `
<tr>

<td>

<div class="avatar">

${user.username.charAt(0).toUpperCase()}

</div>

${user.username}

</td>

<td>

${user.email}

</td>

<td>

<button
onclick="deleteUser(${user.id})"
>

Delete

</button>

</td>

</tr>
`;

        });

}

// ==========================
// DASHBOARD
// ==========================

function updateDashboard() {

    const userCount =
        document.getElementById(
            "userCount"
        );

    if (userCount) {

        userCount.textContent =
            users.length;

    }

}

// ==========================
// PASSWORD GENERATOR
// ==========================

function updateLength() {

    const slider =
        document.getElementById(
            "length"
        );

    const value =
        document.getElementById(
            "lengthValue"
        );

    if (slider && value) {

        value.textContent =
            slider.value;

    }

}

function generatePassword() {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    const length =
        document.getElementById(
            "length"
        )?.value || 12;

    let password = "";

    for (
        let i = 0;
        i < length;
        i++
    ) {

        password +=
            chars.charAt(
                Math.floor(
                    Math.random()
                    * chars.length
                )
            );

    }

    const input =
        document.getElementById(
            "password"
        );

    if (input) {

        input.value =
            password;

    }

    checkStrength(
        password
    );

}

function checkStrength(password) {

    const bar =
        document.getElementById(
            "strengthBar"
        );

    if (!bar) return;

    bar.className = "";

    if (
        password.length < 8
    ) {

        bar.style.width =
            "30%";

        bar.classList.add(
            "weak"
        );

    }

    else if (
        password.length < 14
    ) {

        bar.style.width =
            "65%";

        bar.classList.add(
            "medium"
        );

    }

    else {

        bar.style.width =
            "100%";

        bar.classList.add(
            "strong"
        );

    }

}

function copyPassword() {

    const password =
        document.getElementById(
            "password"
        );

    if (!password) return;

    navigator.clipboard.writeText(
        password.value
    );

    showToast(
        "Password Copied"
    );

}

function togglePassword() {

    const password =
        document.getElementById(
            "password"
        );

    if (!password) return;

    password.type =
        password.type === "password"
            ? "text"
            : "password";

}
// ==========================
// PASSWORD STORAGE
// ==========================

let passwords =
JSON.parse(
localStorage.getItem(
"passwords"
)
) || [];

function savePassword(){

const website =
document
.getElementById(
"website"
)
.value;

const category =
document
.getElementById(
"category"
)
.value;

const password =
document
.getElementById(
"password"
)
.value;

if(
!website ||
!password
){

alert(
"Generate password first"
);

return;

}

passwords.push({

id:Date.now(),

website,

category,

password,

created:
new Date()
.toLocaleString()

});

localStorage.setItem(

"passwords",

JSON.stringify(
passwords
)

);

alert(
"Password Saved"
);

}
// ==========================
// DARK MODE
// ==========================

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    localStorage.setItem(
        "theme",
        document.body.classList.contains(
            "light-mode"
        )
    );

}

if (
    localStorage.getItem(
        "theme"
    ) === "true"
) {

    document.body.classList.add(
        "light-mode"
    );

}

// ==========================
// TOAST
// ==========================

function showToast(msg) {

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "toast";

    toast.innerText =
        msg;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="k"){

e.preventDefault();

document
.getElementById("commandPalette")
.style.display="flex";

}

});

function closePalette(){

document
.getElementById("commandPalette")
.style.display="none";

}

function navigatePage(page){

window.location.href=page;

}// ==========================
// PASSWORD RENDER
// ==========================

function renderPasswords(){

    const list =
    document.getElementById(
        "passwordList"
    );

    if(!list) return;

    list.innerHTML = "";

    passwords.forEach(item=>{

        list.innerHTML += `

        <div class="password-card">

            <h3>${item.website}</h3>

            <p>${item.category}</p>

            <code>${item.password}</code>

        </div>

        `;

    });

}
// ==========================
// PAGE LOAD
// ==========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    renderUsers();

    renderPasswords();

    updateDashboard();

}
);