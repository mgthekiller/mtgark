import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const db = getFirestore(app);

async function loadProducts() {
    const productsContainer = document.querySelector(".product-list");
    productsContainer.innerHTML = ""; // مسح المحتوى القديم

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
    const products = document.querySelectorAll(".product");
    
    searchButton.addEventListener("click", function () {
        const searchTerm = searchBar.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });

    const cartItems = document.querySelector(".cart-items");
    const addToCartButtons = document.querySelectorAll(".product .btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement;
            const productName = product.querySelector("h3").textContent;
            const productPrice = product.querySelector("span").textContent;
            
            const cartItem = document.createElement("p");
            cartItem.textContent = `${productName} - ${productPrice}`;
            cartItems.appendChild(cartItem);
        });
    });
}

// تحميل المنتجات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadProducts);
