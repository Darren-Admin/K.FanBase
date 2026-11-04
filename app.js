let currentUser = null;

function openLogin() {
document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
document.getElementById("loginModal").style.display = "none";
}

function openSignup() {
document.getElementById("signupModal").style.display = "flex";
}

function closeSignup() {
document.getElementById("signupModal").style.display = "none";
}

function signup(){

let username =
document.getElementById("signupUser").value;

let password =
document.getElementById("signupPass").value;

if(!username || !password){
alert("Fill everything");
return;
}

let account = {

password: password,
role: "Fan",
level: 1,

notifications:[
"Welcome to LA8 Creator Hub!"
]

};

localStorage.setItem(
"user_" + username,
JSON.stringify(account)
);

updateMembers();

alert("Account Created");

closeSignup();
}

function login(){

let username =
document.getElementById("loginUser").value;

let password =
document.getElementById("loginPass").value;

let account =
JSON.parse(
localStorage.getItem(
"user_" + username
)
);

if(!account){
alert("User Not Found");
return;
}

if(account.password !== password){
alert("Wrong Password");
return;
}

currentUser = username;

document.getElementById(
"profileName"
).innerText = username;

document.getElementById(
"profileRole"
).innerText =
"Role: " + account.role;

document.getElementById(
"profileLevel"
).innerText =
"Level: " + account.level;

document.getElementById(
"currentRole"
).innerText =
account.role;

loadNotifications(
account.notifications
);

alert(
"Welcome " + username
);

closeLogin();
}

function loadNotifications(list){

let box =
document.getElementById(
"notifications"
);

box.innerHTML = "";

list.forEach(note=>{

let li =
document.createElement("li");

li.innerText = note;

box.appendChild(li);

});

}

document.getElementById(
"fanForm"
).addEventListener(
"submit",
function(e){

e.preventDefault();

let fans =
Number(
localStorage.getItem(
"fans"
)
)||0;

fans++;

localStorage.setItem(
"fans",
fans
);

document.getElementById(
"fanCount"
).innerText = fans;

alert("You're now a fan!");

}
);

document.getElementById(
"applicationForm"
).addEventListener(
"submit",
function(e){

e.preventDefault();

let apps =
JSON.parse(
localStorage.getItem(
"applications"
)||"[]"
);

apps.push({

name:
document.getElementById(
"appName"
).value,

skill:
document.getElementById(
"appSkill"
).value,

experience:
document.getElementById(
"appExperience"
).value

});

localStorage.setItem(
"applications",
JSON.stringify(apps)
);

alert(
"Application Submitted"
);

}
);

function createProject(){

let title =
document.getElementById(
"projectTitle"
).value;

let description =
document.getElementById(
"projectDescription"
).value;

let projects =
JSON.parse(
localStorage.getItem(
"projects"
)||"[]"
);

projects.push({

title:title,
description:description

});

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

renderProjects();
}

function renderProjects(){

let area =
document.getElementById(
"projectArea"
);

area.innerHTML="";

let projects =
JSON.parse(
localStorage.getItem(
"projects"
)||"[]"
);

projects.forEach(project=>{

area.innerHTML +=

`<div class="project">

<h3>${project.title}</h3>

<p>${project.description}</p>

</div>`;

});

document.getElementById(
"projectCount"
).innerText =
projects.length;

}

function updateMembers(){

let total = 0;

for(let i=0;i<localStorage.length;i++){

let key =
localStorage.key(i);

if(
key.startsWith(
"user_"
)
){
total++;
}

}

document.getElementById(
"memberCount"
).innerText =
total;

}

function initialize(){

document.getElementById(
"fanCount"
).innerText =
localStorage.getItem(
"fans"
) || 0;

renderProjects();

updateMembers();

}

initialize();
