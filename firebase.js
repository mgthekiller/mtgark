// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// ✅ بيانات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC235xZqDjD6ZitQc6u6F1928vLyhd5Xys",
    authDomain: "matgrak-53f09.firebaseapp.com",
    projectId: "matgrak-53f09",
    storageBucket: "matgrak-53f09.appspot.com",
    messagingSenderId: "785925288214",
    appId: "1:785925288214:web:33b74203635e357a99e037" // استبدلها بالقيمة الصحيحة
};


// ✅ تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, doc, getDoc };
