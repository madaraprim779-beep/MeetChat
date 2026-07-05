// chat.js
import { db } from './firebase.js'; 
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"; // Import important
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const auth = getAuth(); // Initialise l'authentification
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages');

// 1. Fonction pour envoyer un message (avec vérification utilisateur)
sendBtn.addEventListener('click', async () => {
    const text = msgInput.value.trim();
    const user = auth.currentUser; // Récupère l'utilisateur connecté

    if (text !== "" && user) {
        try {
            await addDoc(collection(db, "messages"), {
                text: text,
                userName: user.displayName || user.email || "Anonyme", // Enregistre le nom ou l'email
                createdAt: serverTimestamp()
            });
            msgInput.value = ''; // Vide le champ après envoi
        } catch (error) {
            console.error("Erreur d'envoi : ", error);
            alert("Erreur lors de l'envoi");
        }
    } else if (!user) {
        alert("Tu dois être connecté pour envoyer un message !");
    }
});

// 2. Fonction pour écouter les messages en temps réel
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = ''; 
    snapshot.forEach((doc) => {
        const data = doc.data();
        const p = document.createElement('p');
        // Affiche le nom de l'auteur et le message
        p.textContent = `${data.userName || "Anonyme"} : ${data.text}`;
        messagesContainer.appendChild(p);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
