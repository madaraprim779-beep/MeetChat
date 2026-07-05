db.collection("users").get().then(snapshot => {
  let usersDiv = document.getElementById("users");

  snapshot.forEach(doc => {
    let user = doc.data();

    let div = document.createElement("div");
    div.innerHTML = user.name;

    usersDiv.appendChild(div);
  });
});