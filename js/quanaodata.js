import { clothesProducts } from "./data.js";

let productLis = document.querySelector(".product-list");
let sumOfProduct = ``;

let sum = 0;
for (let key of clothesProducts) {
  if (sum < 8) {
    sumOfProduct += `
    <div class="product">
                <div class="images"> <img src="${key.image}" alt=""></div>
                 <h3>${key.price}</h3>
                 <p>${key.name}</p>
                 <a href="chitiet.html?id=${key.id}">Xem thêm</a>
                </div>
    `;
  }
  sum++;
}
console.log(sumOfProduct);

productLis.innerHTML = sumOfProduct;
