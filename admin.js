import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

document.getElementById("productForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();
    const imageUrl = document.getElementById("productImage").value.trim();
    const freeShipping = document.getElementById("freeShipping").checked;

    if (!name || !price || !description || !imageUrl) {
        alert("❌ يرجى ملء جميع الحقول!");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "products"), {
            name,
            price: parseFloat(price),
            description,
            image: imageUrl,
            freeShipping
        });

        console.log("تمت إضافة المنتج بمعرف:", docRef.id);
        alert("✅ تم إضافة المنتج بنجاح!");
        document.getElementById("productForm").reset();
        await loadProducts(); // تحميل المنتجات بعد الإضافة
    } catch (error) {
        console.error("❌ خطأ أثناء إضافة المنتج:", error);
        alert("حدث خطأ أثناء إضافة المنتج، حاول مرة أخرى!");
    }
});

// حذف المنتج
async function deleteProduct(productId) {
    if (!confirm("⚠️ هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
        console.log("🔍 حذف المنتج بمعرف:", productId);
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef); // تأكد من استخدام `await`
        alert("🗑️ تم حذف المنتج بنجاح!");
        await loadProducts(); // تحديث القائمة بعد الحذف
    } catch (error) {
        console.error("❌ خطأ أثناء حذف المنتج:", error);
        alert("حدث خطأ أثناء حذف المنتج، حاول مرة أخرى!");
    }
}

// تحميل المنتجات وعرضها في القائمة
async function loadProducts() {
    const productsContainer = document.getElementById("admin-products");
    productsContainer.innerHTML = "";

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((docSnap) => {
            const product = docSnap.data();
            const productId = docSnap.id;
            console.log("📦 تحميل المنتج:", product.name, "ID:", productId);

            const productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px;">
                <h3>${product.name}</h3>
                <p>السعر: ${product.price} جنيه</p>
                <p>${product.description}</p>
                ${product.freeShipping ? '<p style="color: green;">🚚 شحن مجاني</p>' : ''}
                <button onclick="deleteProduct('${productId}')" style="background-color:red; color:white; padding:5px 10px; border:none; cursor:pointer;">🗑️ حذف</button>
            `;

            productsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error("❌ خطأ أثناء تحميل المنتجات:", error);
    }
}

// تحميل المنتجات عند فتح الصفحة
window.onload = async () => {
    console.log("🔄 تحميل المنتجات...");
    await loadProducts();
};
