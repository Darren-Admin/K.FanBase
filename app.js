let currentUser = null;

function openLogin(){
document.getElementById("loginModal").style.display="flex";
}

function closeLogin(){
document.getElementById("loginModal").style.display="none";
}

function openSignup(){
document.getElementById("signupModal").style.display="flex";
}

function closeSignup(){
document.getElementById("signupModal").style.display="none";
}

function signup(){

const username =
document.getElementById("signupUser").value;

const password =
document.getElementById("signupPass").value;

if(!username || !password)
return alert("Fill all fields");

const account = {

password: password,

role: "Fan",

level: 1,

xp: 0,

notifications:[
"Welcome to LA8 Creator Hub!"
]

};

localStorage.setItem(
"user_" + username,
JSON.stringify(account)
);

updateMemberCount();

alert("Account Created");
closeSignup();
}

function login(){

const username =
document.getElementById("loginUser").value;

const password =
document.getElementById("loginPass").value;

const account =
JSON.parse(
localStorage.getItem(
"user_" + username
)
);

if(!account)
return alert("User not found");

if(account.password !== password)
return alert("Wrong password");

currentUser = username;

document.getElementById("profileName")
.innerText = username;

document.getElementById("profileRole")
.innerText =
"Role: " + account.role;

document.getElementById("profileLevel")
.innerText =
"Level: " + account.level;

document.getElementById("onlineStatus")
.innerText = "Online";

loadNotifications(
account.notifications
);

alert("Welcome " + username);

closeLogin();
}

function loadNotifications(list){

const container =
document.getElementById("notifications");

container.innerHTML = "";

list.forEach(note => {

container.innerHTML +=
`
<div class="notification">
${note}
</div>
`;

});
}

document.getElementById("fanForm")
.addEventListener(
"submit",
function(e){

e.preventDefault();

let fans =
Number(
localStorage.getItem("fans")
)||0;

fans++;

localStorage.setItem(
"fans",
fans
);

document.getElementById("fanCount")
.innerText = fans;

alert("Fan registration successful");

}
);

document.getElementById("teamForm")
.addEventListener(
"submit",
function(e){

e.preventDefault();

const applications =
JSON.parse(
localStorage.getItem(
"applications"
)||"[]"
);

applications.push({

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
JSON.stringify(applications)
);

alert(
"Application Submitted"
);

});
function createProject(){

const title =
document.getElementById(
"projectTitle"
).value;

const desc =
document.getElementById(
"projectDescription"
).value;

if(!title) return;

const projects =
JSON.parse(
localStorage.getItem(
"projects"
)||"[]"
);

projects.push({

title:title,
description:desc,
status:"In Progress"

});

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

renderProjects();
}

function renderProjects(){

const container =
document.getElementById(
"projectArea"
);

container.innerHTML="";

const projects =
JSON.parse(
localStorage.getItem(
"projects"
)||"[]"
);

projects.forEach(project => {

container.innerHTML +=
`
<div class="project">

<h3>${project.title}</h3>

<p>${project.description}</p>

<p>Status:
<b>${project.status}</b></p>

</div>
`;

});

document.getElementById(
"projectCount"
).innerText =
projects.length;
}

function createPost(){

const input =
document.getElementById(
"postInput"
);

const text = input.value;

if(!text) return;

const posts =
JSON.parse(
localStorage.getItem(
"posts"
)||"[]"
);

posts.push({

author:
currentUser || "Guest",

message:text

});

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

input.value="";

renderPosts();
}

function renderPosts(){

const container =
document.getElementById(
"forumPosts"
);

container.innerHTML="";

const posts =
JSON.parse(
localStorage.getItem(
"posts"
)||"[]"
);

posts.reverse().forEach(post=>{

container.innerHTML +=
`
<div class="project">

<h4>${post.author}</h4>

<p>${post.message}</p>

</div>
`;

});
}

function updateMemberCount(){

let total = 0;

for(
let i=0;
i<localStorage.length;
i++
){

const key =
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
).innerText = total;
}

function initialize(){

document.getElementById(
"fanCount"
).innerText =
localStorage.getItem(
"fans"
)||0;

updateMemberCount();

renderProjects();

renderPosts();

}

initialize();
