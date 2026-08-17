import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApQLXBgkMow4Oq4T_UNj6B8aIaLPpg0YU",
  authDomain: "project-model-motorcycle.firebaseapp.com",
  projectId: "project-model-motorcycle",
  storageBucket: "project-model-motorcycle.firebasestorage.app",
  messagingSenderId: "883637935533",
  appId: "1:883637935533:web:08dfa40a181bdc22e69524",
  measurementId: "G-N7NVQ44F69",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
