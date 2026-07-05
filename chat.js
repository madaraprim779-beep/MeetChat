import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// Envoi du message
sendBtn.addEventListener('click', async () => {
    if (msgInput.value.trim() !== "") {
        await addDoc(collection(db, "messages"), {
            text: msgInput.value,
            createdAt: serverTimestamp(),
            userId: "user123" // À remplacer par auth.currentUser.uid plus tard
        });
        msgInput.value = '';
    }
});

// Écoute des messages
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const p = document.createElement('p');
        p.textContent = doc.data().text;
        messagesContainer.appendChild(p);
    });
});
