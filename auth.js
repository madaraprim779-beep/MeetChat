function register() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      db.collection("users").doc(user.user.uid).set({
        name: name,
        email: email
      });

      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
}