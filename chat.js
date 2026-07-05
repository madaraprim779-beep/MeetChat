import { db } from './firebase.js'; 
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// Envoyer
sendBtn.addEventListener('click', async () => {
    if (msgInput.value.trim() !== "") {
        await addDoc(collection(db, "messages"), {
            text: msgInput.value,
            createdAt: serverTimestamp()
        });
        msgInput.value = '';
    }
});

// Recevoir
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const p = document.createElement('p');
        p.textContent = doc.data().text;
        messagesContainer.appendChild(p);
    });
});

