// chat.js
import { db, auth } from './firebase.js'; // Import depuis votre fichier central
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// Envoyer un message
sendBtn.addEventListener('click', async () => {
    if (msgInput.value.trim() !== "") {
        await addDoc(collection(db, "messages"), {
            text: msgInput.value,
            createdAt: serverTimestamp(),
            userId: "user1" // À remplacer par auth.currentUser.uid plus tard
        });
        msgInput.value = '';
    }
});

// Lire les messages
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const p = document.createElement('p');
        p.textContent = doc.data().text;
        messagesContainer.appendChild(p);
    });
});

