import { products } from "./data.js";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db, auth } from "./firebase.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const product = products.find((item) => item.id === Number(id));

document.querySelector("main").innerHTML = `
<div class="contect">
<div class="anh"><img src="${product.image}" alt=""></div>
<div class="tillet">
    <h2>${product.name}</h2>  
     <strong>${product.price}</strong>
    <p>Hà Nội, Việt Nam<br> <br>

     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione laborum quo quos omnis sed magnam id, ducimus saepe, debitis error earum, iste dicta odio est sint dolorem magni animi tenetur. <br> <br>
     
     Perferendis eligendi reprehenderit, assumenda molestias nisi eius iste reiciendis porro tenetur in, repudiandae amet libero. Doloremque, reprehenderit cupiditate error laudantium qui, esse quam debitis, eum cumque perferendis, illum harum expedita.

     </p>     
     <button onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>      
</div>
</div>
`;

window.addToCart = async (productId) => {
  if (!auth.currentUser) {
    alert("Please login");
    return;
  }

  const docRef = doc(db, `cart-${auth.currentUser.uid}`, `${productId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      quantity: increment(1),
    });
  } else {
    await setDoc(docRef, {
      ...products.find((item) => item.id === productId),
      quantity: 1,
    });
  }

  alert("Added to cart successfully");
};
