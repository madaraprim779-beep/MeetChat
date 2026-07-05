function register(){
let email = document.getElementById("r-email").value;
let pass = document.getElementById("r-pass").value;

auth.createUserWithEmailAndPassword(email, pass)
.then(u=>{
db.collection("users").doc(u.user.uid).set({
email: email,
online: true
});

window.location.href="home.html";
});
}

function login(){
let email = document.getElementById("l-email").value;
let pass = document.getElementById("l-pass").value;

auth.signInWithEmailAndPassword(email, pass)
.then(()=>{
window.location.href="home.html";
});
}