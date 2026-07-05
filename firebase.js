// 1. Importez les fonctions modulaires nécessaires
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2. Votre configuration reste identique
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_BUCKET",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// 3. Initialisation
const app = initializeApp(firebaseConfig);

// 4. Exportation des services (C'est ici que ça change)
export const auth = getAuth(app);
export const db = getFirestore(app);
