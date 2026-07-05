// chat.js
import { db, auth } from './firebase.js';
import { 
    collection, addDoc, serverTimestamp, 
    onSnapshot, query, orderBy 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Récupération des éléments du DOM
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// 1. Envoi du message
sendBtn.addEventListener('click', async () => {
    if (msgInput.value.trim() !== "") {
        try {
            await addDoc(collection(db, "messages"), {
                text: msgInput.value,
                createdAt: serverTimestamp(),
                userId: "user1" 
            });
            msgInput.value = ''; // Vider l'input après envoi
        } catch (error) {
            console.error("Erreur lors de l'envoi : ", error);
        }
    }
});

// 2. Affichage des messages en temps réel
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = ''; // Nettoyer l'affichage avant de rafraîchir
    snapshot.forEach((doc) => {
        const messageData = doc.data();
        const p = document.createElement('p');
        p.textContent = messageData.text;
        messagesContainer.appendChild(p);
    });
});


