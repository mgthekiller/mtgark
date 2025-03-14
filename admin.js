import { db } from "./firebase-config.js";
import { collection, getDocs, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// مرجع لقاعدة البيانات
const productsCollection = collection(db, "products");

// تحميل المنتجات عند فتح الصفحة
async function loadProducts() {
    const productsContainer = document.getElementById("admin-products");
    productsContainer.innerHTML = ""; // مسح المحتوى القديم

    const querySnapshot = await getDocs(productsCollection);
    querySnapshot.forEach((docSnap) => {
        const product = docSnap.data();
        const productId = docSnap.id; // معرف المنتج في Firestore

        const productElement = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>السعر: $${product.price}</span>
                <button class="delete-product" data-id="${productId}">🗑️ حذف</button>
            </div>
        `;
        productsContainer.innerHTML += productElement;
    });

    // إضافة حدث الحذف لكل زر
    document.querySelectorAll(".delete-product").forEach(button => {
        button.addEventListener("click", async function () {
            const productId = this.getAttribute("data-id");
            const confirmDelete = confirm("❌ هل أنت متأكد أنك تريد حذف هذا المنتج؟");
            if (confirmDelete) {
                await deleteDoc(doc(db, "products", productId));
                alert("✅ تم حذف المنتج بنجاح!");
                loadProducts(); // تحديث القائمة بعد الحذف
            }
        });
    });
}

// إضافة منتج جديد
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;
    const description = document.getElementById("productDescription").value;

    if (name && price && image && description) {
        await addDoc(productsCollection, { name, price, image, description });
        alert("✅ تم إضافة المنتج بنجاح!");
        loadProducts(); // تحديث القائمة بعد الإضافة
        document.getElementById("productForm").reset(); // مسح الحقول
    } else {
        alert("❌ الرجاء ملء جميع الحقول!");
    }
});

// تحميل المنتجات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadProducts);
