import { db, auth } from './firebase.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// 1. Vérification de la connexion
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// 2. Envoi du message
sendBtn.addEventListener('click', async () => {
    if (msgInput.value.trim() !== "") {
        await addDoc(collection(db, "messages"), {
            text: msgInput.value,
            createdAt: serverTimestamp(),
            userId: auth.currentUser.uid
        });
        msgInput.value = '';
    }
});

// 3. Affichage en temps réel
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const message = doc.data();
        const p = document.createElement('p');
        p.textContent = `${message.text}`;
        messagesContainer.appendChild(p);
    });
});

