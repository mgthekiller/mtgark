import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyC235xZqDjD6ZitQc6u6F1928vLYhd5Xys",
    authDomain: "matgrak-53f09.firebaseapp.com",
    projectId: "matgrak-53f09",
    storageBucket: "matgrak-53f09.appspot.com",
    messagingSenderId: "785925288214",
    appId: "1:785925288214:web:33b74203635e357a99e037",
    measurementId: "G-R8Y2V6MY2S"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
