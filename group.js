auth.onAuthStateChanged(user => {
  if (!user) location.href = "index.html";
  loadGroups();
});

function createGroup() {
  let name = document.getElementById("groupName").value;

  db.collection("groups").add({
    name: name,
    admin: auth.currentUser.uid,
    members: [auth.currentUser.uid],
    time: Date.now()
  });
}

function loadGroups() {
  db.collection("groups").onSnapshot(snap => {
    let box = document.getElementById("groups");
    box.innerHTML = "";

    snap.forEach(g => {
      box.innerHTML += `
        <div class="msg" onclick="openGroup('${g.id}')">
          👥 ${g.data().name}
        </div>
      `;
    });
  });
}

function openGroup(id){
  localStorage.setItem("groupId", id);
  location.href="chat.html?type=group";
}