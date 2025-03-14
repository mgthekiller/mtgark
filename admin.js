import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC235xZqDjD6ZitQc6u6F1928vLYhd5Xys",
  authDomain: "matgrak-53f09.firebaseapp.com",
  projectId: "matgrak-53f09",
  storageBucket: "matgrak-53f09.appspot.com",
  messagingSenderId: "785925288214",
  appId: "1:785925288214:web:33b74203635e357a99e037",
  measurementId: "G-R8Y2V6MY2S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("productForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const imageUrl = document.getElementById("productImage").value.trim(); // رابط الصورة مباشرة

    if (!name || !price || !description || !imageUrl) {
        alert("❌ يرجى ملء جميع الحقول!");
        return;
    }

    try {
        await addDoc(collection(db, "products"), {
            name,
            price: parseFloat(price),
            description,
            image: imageUrl // استخدام رابط الصورة مباشرة
        });

        alert("✅ تم إضافة المنتج بنجاح!");
        document.getElementById("productForm").reset();
    } catch (error) {
        console.error("❌ خطأ أثناء إضافة المنتج:", error);
        alert("حدث خطأ أثناء إضافة المنتج، حاول مرة أخرى!");
    }
});
