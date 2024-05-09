import { db, auth } from "./firebase.js";
import { products } from "./data.js";
import {
  collection,
  onSnapshot,
  deleteDoc,
  increment,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const displayCart = (products) => {
  console.log(products);
  if (products.length === 0) {
    document.querySelector(".cart-container").innerHTML = /* html */ `
      <h4 class="empty-warning">Your cart is empty</h4>
    `;
  } else {
    document.querySelector(".cart-container").innerHTML = /* html */ `
      <table class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
        ${products
          .map(
            (product) => /*html*/ `
            <tr>
              <td>
                <div class="product-cell">
                  <img src="${product.image}" alt="" />
                  <p>${product.name}</p>
                </div>
              </td>
              <td class="quantity-cell">
                <button onclick="removeFromCart(${product.id});">
                  -
                </button>
                <span>${product.quantity}</span>
                <button onclick="addToCart(${product.id});">
                  +
                </button>
              </td>
              <td>${product.price}</td>
            </tr>
          `
          )
          .join("")}
          </tbody>
      </table>
      <div class="total">
        <h2>Total: $${
          Math.round(
            products.reduce((acc, product) => {
              acc +=
                Number(product.price.replace("$", "").trim()) *
                product.quantity;
              return acc;
            }, 0) * 100
          ) / 100
        }</h2>
        <button id="checkout-btn" onclick="alert('Purchased Successfully')">Purchase Now</button>
      </div>
    `;
  }
};

window.addToCart = async (productId) => {
  if (!auth.currentUser) {
    alert("Please login");
    return;
  }

  const docRef = doc(db, `cart-${auth.currentUser.uid}`, `${productId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    updateDoc(docRef, {
      quantity: increment(1),
    });
  } else {
    setDoc(docRef, {
      ...products.find((item) => item.id === productId),
      quantity: 1,
    });
  }
};

window.removeFromCart = async (productId) => {
  const docRef = doc(db, `cart-${auth.currentUser.uid}`, `${productId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.data().quantity === 1) {
    deleteDoc(docRef);
  } else {
    updateDoc(docRef, {
      quantity: increment(-1),
    });
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    onSnapshot(collection(db, `cart-${auth.currentUser.uid}`), (snapshot) => {
      const products = [];
      snapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      displayCart(products);
    });
  } else {
    location.href = "./main.html";
  }
});
