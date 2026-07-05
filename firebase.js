import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AizaSyAsZHLa7Lt8MQqrzkQ1qJKib54E0lxpfMU",
  authDomain: "meetchat-8f5a8.firebaseapp.com",
  projectId: "meetchat-8f5a8",
  storageBucket: "meetchat-8f5a8.firebasestorage.app",
  messagingSenderId: "899856294869",
  appId: "1:899856294869:web:ff5bd9ad7298df9ade9efc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

