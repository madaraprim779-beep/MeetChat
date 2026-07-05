let user;
let chatId = localStorage.getItem("chatId");

auth.onAuthStateChanged(u=>{
user = u;
load();
});

function send(){
db.collection("messages").add({
text: msg.value,
from: user.uid,
to: chatId,
time: Date.now()
});
msg.value="";
}

function load(){
db.collection("messages")
.orderBy("time")
.onSnapshot(snap=>{
messages.innerHTML="";

snap.forEach(m=>{
let d = m.data();

if(
(d.from==user.uid && d.to==chatId) ||
(d.from==chatId && d.to==user.uid)
){
messages.innerHTML += `<div class="msg">${d.text}</div>`;
}
});
});
}
