import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC235xZqDjD6ZitQc6u6F1928vLYhd5Xys",
  authDomain: "matgrak-53f09.firebaseapp.com",
  projectId: "matgrak-53f09",
  storageBucket: "matgrak-53f09.firebasestorage.app",
  messagingSenderId: "785925288214",
  appId: "1:785925288214:web:33b74203635e357a99e037",
  measurementId: "G-R8Y2V6MY2S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// بيانات الإدمن
const adminEmail = "mohamedgaming966@gmail.com";  // غيرها إلى بريد الإدمن
const adminPassword = "admin";  // غيرها إلى باسورد الإدمن

// الاستماع لنموذج تسجيل الدخول
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();  // منع التحديث التلقائي للصفحة

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // التحقق مما إذا كان المستخدم هو الإدمن
            if (email === adminEmail) {
                window.location.href = "admin.html";  // تحويله لصفحة الأدمن
            } else {
                window.location.href = "user.html";  // تحويله لصفحة المستخدم العادي
            }
        })
        .catch((error) => {
            document.getElementById("error-message").innerText = "فشل تسجيل الدخول: " + error.message;
        });
});
