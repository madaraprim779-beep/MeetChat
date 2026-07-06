// auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { auth } from "./firebase.js";

// 🔥 Inscription
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// 🔥 Connexion
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// 🔥 Déconnexion
export function logout() {
  return signOut(auth);
}

// 🔥 Observer utilisateur connecté
export function onUserChanged(callback) {
  return onAuthStateChanged(auth, callback);
}