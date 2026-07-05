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
            await addDoc(collection(db, "

