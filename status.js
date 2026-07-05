function uploadStatus(){
let file=document.getElementById("file").files[0];

let ref=storage.ref("status/"+file.name);

ref.put(file).then(()=>{
ref.getDownloadURL().then(url=>{

db.collection("status").add({
image:url,
user:auth.currentUser.uid,
time:Date.now()
});

});
});
}

function loadStatus(){
db.collection("status")
.orderBy("time","desc")
.onSnapshot(snap=>{
statuses.innerHTML="";

snap.forEach(s=>{
statuses.innerHTML+=`
<img src="${s.data().image}" width="100%">
`;
});
});
}

loadStatus();