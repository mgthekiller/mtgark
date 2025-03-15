import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
    const imageUrl = document.getElementById("productImage").value.trim();
    const freeShipping = document.getElementById("freeShipping").checked; // تحقق من حالة الشحن المجاني

    if (!name || !price || !description || !imageUrl) {
        alert("❌ يرجى ملء جميع الحقول!");
        return;
    }

    try {
        await addDoc(collection(db, "products"), {
            name,
            price: parseFloat(price),
            description,
            image: imageUrl,
            freeShipping // إضافة حالة الشحن المجاني
        });

        alert("✅ تم إضافة المنتج بنجاح!");
        document.getElementById("productForm").reset();
        loadProducts(); // تحديث قائمة المنتجات مباشرة بعد الإضافة
    } catch (error) {
        console.error("❌ خطأ أثناء إضافة المنتج:", error);
        alert("حدث خطأ أثناء إضافة المنتج، حاول مرة أخرى!");
    }
});

// تحميل المنتجات وعرضها في القائمة
async function loadProducts() {
    const productsContainer = document.getElementById("admin-products");
    productsContainer.innerHTML = ""; // تفريغ القائمة قبل إعادة التحميل

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px;">
                <h3>${product.name}</h3>
                <p>السعر: ${product.price} جنيه</p>
                <p>${product.description}</p>
                ${product.freeShipping ? '<p style="color: green;">🚚 شحن مجاني</p>' : ''}
            `;
            productsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error("❌ خطأ أثناء تحميل المنتجات:", error);
    }
}

// تحميل المنتجات عند فتح الصفحة
window.onload = loadProducts;
