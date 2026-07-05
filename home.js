auth.onAuthStateChanged(user=>{
if(!user) location.href="index.html";

db.collection("users").onSnapshot(snap=>{
let box = document.getElementById("users");
box.innerHTML="";

snap.forEach(u=>{
if(u.id !== user.uid){
box.innerHTML += `
<div class="user" onclick="openChat('${u.id}')">
${u.data().email} ${u.data().online ? "🟢" : "⚪"}
</div>`;
}
});
});
});

function openChat(id){
localStorage.setItem("chatId", id);
location.href="chat.html";
}