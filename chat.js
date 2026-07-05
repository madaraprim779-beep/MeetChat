let user;
let chatId = localStorage.getItem("chatId");
let groupId = localStorage.getItem("groupId");

auth.onAuthStateChanged(u => {
  user = u;

  if (groupId) {
    loadGroupMessages();
  } else {
    loadPrivateMessages();
  }
});


// 💬 MESSAGE PRIVÉ
function send() {
  let text = msg.value;

  db.collection("messages").add({
    text,
    from: user.uid,
    to: chatId,
    time: Date.now()
  });

  msg.value = "";
}


// 👥 MESSAGE GROUPE
function sendGroup() {
  let text = msg.value;

  db.collection("groupMessages").add({
    groupId: groupId,
    text: text,
    from: user.uid,
    time: Date.now()
  });

  msg.value = "";
}


// PRIVÉ
function loadPrivateMessages(){
db.collection("messages")
.orderBy("time")
.onSnapshot(snap=>{
messages.innerHTML="";

snap.forEach(m=>{
let d=m.data();

if(
(d.from==user.uid && d.to==chatId) ||
(d.from==chatId && d.to==user.uid)
){
messages.innerHTML += `<div class="msg">${d.text}</div>`;
}
});
});
}


// GROUPE
function loadGroupMessages(){
db.collection("groupMessages")
.orderBy("time")
.onSnapshot(snap=>{
messages.innerHTML="";

snap.forEach(m=>{
let d=m.data();

if(d.groupId==groupId){
messages.innerHTML += `<div class="msg">${d.text}</div>`;
}
});
});
}