import { db } from './firebase.js';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

// 1. Récupération des éléments du DOM (ajustez selon les ID de votre HTML)
const chatContainer = document.getElementById('chat-messages'); // La zone où s'affichent les messages
const sendButton = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');

// 2. Écoute des messages en temps réel
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    // Effacer le contenu actuel pour rafraîchir la liste
    chatContainer.innerHTML = '';
    
    snapshot.forEach((doc) => {
        const message = doc.data();
        const div = document.createElement('div');
        div.textContent = `${message.text}`; // Affiche le texte
        chatContainer.appendChild(div);
    });
});

// 3. Fonction pour envoyer un message (liée à votre bouton)
sendButton.addEventListener('click', async () => {
    const text = messageInput.value;
    if (text.trim() !== "") {
        await addDoc(collection(db, "messages"), {
            text: text,
            createdAt: serverTimestamp(),
            userId: "votre-id-utilisateur" // À récupérer via auth.currentUser.uid
        });
        messageInput.value = ''; // Vider l'input après envoi
    }
});
