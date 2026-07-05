const db = firebase.firestore();

// envoyer message
function sendMessage() {
  let msg = document.getElementById("msg").value;

  db.collection("messages").add({
    text: msg,
    time: Date.now()
  });

  document.getElementById("msg").value = "";
}

// afficher messages en temps réel
db.collection("messages")
.orderBy("time")
.onSnapshot(snapshot => {

  let box = document.getElementById("messages");
  box.innerHTML = "";

  snapshot.forEach(doc => {
    let p = document.createElement("p");
    p.innerText = doc.data().text;
    box.appendChild(p);
  });

});