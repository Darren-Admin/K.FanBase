

// ================================
// Firebase Imports
// ================================
 
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
 
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
 
import {
getFirestore,
doc,
setDoc,
getDoc,
addDoc,
collection,
getDocs,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
 
// ================================
// FIREBASE CONFIG
// REPLACE WITH YOUR OWN
// ================================
 
const firebaseConfig = {
 
apiKey: "AIzaSyCBCV-MPXyx9RoT5JUj69J1SMsbBJU_koE",

 
authDomain:
"k-studios-creator-hub.firebaseapp.com",
 
projectId:
"k-studios-creator-hub",
 
 
storageBucket:
"k-studios-creator-hub.firebasestorage.app",
 
 
messagingSenderId:
"YOUR_SENDER_ID",
 
appId:
"910957319966",
 
 
};
 
// ================================
// INITIALIZE
// ================================
 
const app =
initializeApp(firebaseConfig);
 
const auth =
getAuth(app);
 
const db =
getFirestore(app);
 
let currentUser = null;
 
// ================================
// MODALS
// ================================
 
window.openLogin = function(){
  document.getElementById(
"loginModal"
).style.display = "flex";

}

window.closeLogin = function(){

document.getElementById(
"loginModal"
).style.display = "none";}
 
window.openSignup = function(){
 
document.getElementById(
"signupModal"
).style.display = "flex";
 
}
 
window.closeSignup = function(){
 
document.getElementById(
"signupModal"
).style.display = "none";
 
}
 
// ================================
// SIGNUP
// ================================
 
window.signup = async function(){
 
const username =
document.getElementById(
"signupUser"
).value.trim();
 
const password =
document.getElementById(
"signupPass"
).value.trim();
 
if(!username || !password){
 
alert("Fill all fields");
return;
 
}
 
const email =
`${username}@k-studioshub.com`;
 
try{
 
const result =
await createUserWithEmailAndPassword(
auth,
email,
password
);
 
await setDoc(
 
doc(
db,
"users",
result.user.uid
),
 
{
 
username: username,
role: "Fan",
level: 1,
xp: 0,
badges: [],
joined:
serverTimestamp(),
 
notifications:[
"Welcome to K-Studios Creator Hub!"
]
 
}
 
);
 
alert(
"Account Created Successfully"
);
 
closeSignup();
 
}
catch(error){
 
alert(error.message);
 
}
 
}
 
// ================================
// LOGIN
// ================================
 
window.login = async function(){
 
const username =
document.getElementById(
"loginUser"
).value.trim();
 
const password =
document.getElementById(
"loginPass"
).value.trim();
 
const email =
`${username}@k-studioshub.com`;
 
try{
await signInWithEmailAndPassword(
auth,
email,
password
);

closeLogin();

}
catch(error){

alert(
error.message
);

}

}

// ================================
// LOGOUT
// ================================

window.logout = async function(){

await signOut(auth);

alert("Logged out");
}
// ================================
// AUTH STATE
// ================================

onAuthStateChanged(

auth,

async(user)=>{

if(!user){

document.getElementById(
"profileName"
).innerText =
"Guest";

document.getElementById(
"profileRole"
).innerText =
"Role: Guest";

document.getElementById(
"profileLevel"
  ).innerText =
"Level: 1";

document.getElementById(
"onlineStatus"
).innerText =
"Offline";

return;

}

currentUser = user;

const docRef =
doc(
db,
"users",
user.uid
);

const snap =
await getDoc(
docRef
);

if(!snap.exists()) return;

const data =
  snap.data();

document.getElementById(
"profileName"
).innerText =
data.username;

document.getElementById(
"profileRole"
).innerText =
`Role: ${data.role}`;

document.getElementById(
"profileLevel"
).innerText =
`Level: ${data.level}`;

document.getElementById(
"onlineStatus"
).innerText =
"Online";
loadNotifications(
data.notifications
);

}

);

// ================================
// NOTIFICATIONS
// ================================

function loadNotifications(

notifications

){

const area =
  document.getElementById(
"notifications"
);

area.innerHTML = "";

notifications.forEach(

note=>{

area.innerHTML += `

<div class="notification">

${note}

</div>

`;

}

);

}
// ================================
// FAN REGISTRATION
// ================================

const fanForm =
document.getElementById(
"fanForm"
);

if(fanForm){

fanForm.addEventListener(

"submit",

async(e)=>{

e.preventDefault();

await addDoc(

collection(
db,
"fans"
  ),

{

user:
currentUser ?
currentUser.uid :
"guest",

joined:
serverTimestamp()

}

);

alert(
"Joined Fanbase"
);
  updateFanCount();

}

);

}

// ================================
// TEAM APPLICATIONS
// ================================

const teamForm =
document.getElementById(
"teamForm"
);

if(teamForm){

teamForm.addEventListener(

"submit",
  async(e)=>{

e.preventDefault();

await addDoc(

collection(
db,
"applications"
),

{

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
).value,

submitted:
serverTimestamp()

}

);

alert(
"Application Submitted"
);

}

);

}

// ================================
// PROJECTS
// ================================
window.createProject =
async function(){

const title =
document.getElementById(
"projectTitle"
).value;

const description =
document.getElementById(
"projectDescription"
).value;

if(!title){

alert("Project title required");
return;

}

await addDoc(

collection(
db,
"projects"
),

{

title,
description,

status:
"In Progress",

created:
serverTimestamp()

}

);

renderProjects();

}

// ================================
// LOAD PROJECTS
// ================================

async function renderProjects(){

const snapshot =
await getDocs(
collection(
db,
"projects"
)
);

const area =
document.getElementById(
"projectArea"
);

area.innerHTML = "";

let total = 0;

snapshot.forEach(doc=>{

total++;

const project =
doc.data();

area.innerHTML += `

<div class="project">

<h3>
${project.title}
</h3>

<p>
${project.description}
</p>

<p>
${project.status}
</p>

</div>

`;

});

document.getElementById(
"projectCount"
).innerText =
total;

}
// ================================
// COMMUNITY FORUM
// ================================

window.createPost =
async function(){

const postText =
document.getElementById(
"postInput"
).value;

if(!postText) return;

let username =
"Guest";

if(currentUser){

const profile =
await getDoc(
doc(
db,
"users",
currentUser.uid
)
);

if(profile.exists()){

username =
profile.data().username;

}

}

await addDoc(

collection(
db,
"posts"
),

{

author:
username,

message:
postText,

created:
serverTimestamp()

}

);

document.getElementById(
"postInput"
).value = "";

renderPosts();

}

// ================================
// LOAD POSTS
// ================================

async function renderPosts(){

const snapshot =
await getDocs(
collection(
db,
"posts"
));

const area =
document.getElementById(
"forumPosts"
);

area.innerHTML = "";

snapshot.forEach(post=>{

const data =
post.data();

area.innerHTML += `

<div class="project">

<h4>

${data.author}
</h4>

<p>
${data.message}
</p>

</div>

`;

});

}

// ================================
// MEMBER COUNT
// ================================

async function updateMemberCount(){

const users =
await getDocs(
collection(
db,
"users"
)
);

document.getElementById(
"memberCount"
).innerText =
users.size;

}

// ================================
// FAN COUNT
// ================================

async function updateFanCount(){

const fans =
await getDocs(
collection(
db,
"fans"
)
);

document.getElementById(
"fanCount"
).innerText =
fans.size;

}

// ================================
// INITIALIZE
// ================================

async function initialize(){

await updateMemberCount();

await updateFanCount();

await renderProjects();

await renderPosts();

}

initialize();
