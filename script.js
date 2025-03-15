import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

async function loadProducts() {
    const productsContainer = document.querySelector(".product-list");
    productsContainer.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const productElement = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>السعر: $${product.price}</span>
                <button class="btn add-to-cart" data-name="${product.name}" data-price="${product.price}">إضافة إلى السلة</button>
            </div>
        `;
        productsContainer.innerHTML += productElement;
    });

    setupEventListeners();
}

function setupEventListeners() {
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.querySelector(".search .btn");
    
    searchButton.addEventListener("click", function () {
        const searchTerm = searchBar.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = productName.includes(searchTerm) ? "block" : "none";
        });
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price");
            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        });
    });

    document.getElementById("checkout-button").addEventListener("click", handleCheckout);
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>لم يتم إضافة منتجات بعد</p>";
    } else {
        cart.forEach(item => {
            let cartItem = document.createElement("p");
            cartItem.textContent = `${item.name} - $${item.price}`;
            cartContainer.appendChild(cartItem);
        });
    }
}

async function handleCheckout() {
    let fullName = prompt("📝 أدخل اسمك الثلاثي:");
    let address = prompt("📍 أدخل عنوانك:");
    let phone = prompt("📞 أدخل رقم هاتفك:");
    let paymentMethod = prompt("💰 أدخل طريقة الدفع (يجب أن تكون 'الدفع عند الاستلام'):");
    
    if (!fullName || !address || !phone || paymentMethod !== "الدفع عند الاستلام") {
        alert("❌ يجب إدخال جميع البيانات بشكل صحيح وطريقة الدفع يجب أن تكون 'الدفع عند الاستلام'!");
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("🛒 سلتك فارغة!");
        return;
    }
    
    let orderDetails = `**طلب جديد**\n👤 الاسم: ${fullName}\n📍 العنوان: ${address}\n📞 الهاتف: ${phone}\n💰 الدفع: ${paymentMethod}\n🛒 المنتجات:\n`;
    cart.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.name} - $${item.price}\n`;
    });
    
    const webhookUrl = "https://discord.com/api/webhooks/1350575761320443945/ncjMSg8jbcEN7OdjXHh53eDezexeAMpxBBgx23WqL0L16hbqoYCRxT0RFuCJVtTotdmd";
    
    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: orderDetails })
        });
        alert("✅ تم إرسال الطلب بنجاح!");
        localStorage.removeItem("cart");
        updateCart();
    } catch (error) {
        console.error("❌ خطأ في إرسال الطلب:", error);
        alert("حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCart();
});
