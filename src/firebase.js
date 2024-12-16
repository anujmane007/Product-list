import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlFEMZtSiwv_QnIMA4yMfjMPe8y2ialBc",
    authDomain: "product-list-cfd85.firebaseapp.com",
    databaseURL: "https://product-list-cfd85-default-rtdb.firebaseio.com",
    projectId: "product-list-cfd85",
    storageBucket: "product-list-cfd85.firebasestorage.app",
    messagingSenderId: "722162636444",
    appId: "1:722162636444:web:914d41b724392d24e13f59",
    measurementId: "G-L3ZYRKK2T3"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);