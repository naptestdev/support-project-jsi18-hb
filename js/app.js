import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db } from "./database.js";

let openTourId = JSON.parse(localStorage.getItem("openTourId"));
const searchTours = document.getElementById("searchTours");
const trendingTours = document.getElementById("trendingTours");

const toursList = JSON.parse(localStorage.getItem("toursList"));

window.openTourById = (id) => {
  openTourId = [];
  openTourId.push(id);
  localStorage.setItem("openTourId", JSON.stringify(openTourId));
  window.location.href = "../html/tour.html";
};

const convert = (value) => {
  const temp = [];
  const string = String(value);
  for (let i = 0; i < string.length; i++) {
    temp.push(string[i]);
    temp.push(" ");
  }
  let count = 1;
  for (let i = 0; i < temp.length / 3; i++) {
    count += 6;
    temp[temp.length - count] = ".";
  }
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] == " ") {
      temp.splice(i, 1);
    }
  }
  return temp.join("");
};

export const renderTours = () => {
  trendingTours.innerHTML = "";
  for (let i = 0; i < toursList.length; i++) {
    trendingTours.innerHTML += `
        <div class="trending-tour" onclick="openTourById('${toursList[i].id}')">
            <img src="../assets/${toursList[i].image}" alt="Not Found">
            <h5>${toursList[i].name}</h5>
            <div class="rates">
                <div class="positive-rates">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <h4>${toursList[i].positiveRates}</h4>
                </div>
                <div class="negative-rates">
                    <i class="fa-solid fa-thumbs-down"></i>
                    <h4>${toursList[i].negativeRates}</h4>
                </div>
            </div>
            <div class="prices">
                <div class="old-price"><span>${convert(
                  toursList[i].oldPrice
                )}</span></div>
                <div class="new-price"><span>${convert(
                  toursList[i].newPrice
                )}</span></div>
            </div>
        </div>
        `;
  }
};

///////
const tourInformation = document.getElementById("tourInformation");
export const renderTourById = () => {
  for (let i = 0; i < toursList.length; i++) {
    if (toursList[i].id == openTourId[0]) {
      tourInformation.innerHTML = `
            <img src="../assets/${toursList[i].image}" alt="Not Found">
            <div class="infor">
                <div class="name">
                    <h1>${toursList[i].name}</h1>
                </div>
                <div class="description">
                    ${toursList[i].description}
                </div>
                <div class="prices-infor">
                    <div class="new-price">
                        <span>${convert(toursList[i].newPrice)}</span>
                    </div>
                    <div class="old-price">
                        <span>${convert(toursList[i].oldPrice)}</span>
                    </div>
                </div>
                <form class="add-to-cart">
                    <div>
                        <h5>Từ</h5>
                        <input type="date" id="addToCartFromDate" required>
                    </div>
                    <div>
                        <h5>Đến</h5>
                        <input type="date" id="addToCartToDate" required>
                    </div>
                    <button type="submit" id="addToCartBtn"><i class="fa-solid fa-cart-shopping"></i> Đặt ngay</button>
                </form>
            </div>
            `;

      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        addToCartById(toursList[i].id);
      });
    }
  }
};

const addToUserCart = async (product) => {
  await addDoc(
    collection(db, `tour-${JSON.parse(localStorage.getItem("userData")).uid}`),
    product
  );
};

const addToCartById = async (id) => {
  const tourToAdd = {
    fromDate: document.getElementById("addToCartFromDate").value,
    toDate: document.getElementById("addToCartToDate").value,
    id: id,
  };

  await addToUserCart(tourToAdd);

  alert("Đặt vé thành công");
};

const renderAirplanes = () => {
  const airplanesList = JSON.parse(localStorage.getItem("airplanes"));
  const airplanes = document.getElementById("airplanes");

  airplanes.innerHTML = "";
  for (let i = 0; i < airplanesList.length; i++) {
    airplanes.innerHTML += `
        <div class="airplane">
            <div class="upper-airplane">
                <div class="from-to">
                    <div class="from">${airplanesList[i].from}</div>
                    <div> đến </div>
                    <div class="to">${airplanesList[i].to}</div>
                </div>
                <div class="firm"><img src="../assets/${airplanesList[i].firm}.png" alt=""></div>
            </div>
            <div class="lower-plane">
                <div class="upper-lower-plane">
                    <div class="from-date-to-date">
                        <div class="from-date">${airplanesList[i].fromDate}</div>
                        <div> đến </div>
                        <div class="to-date">${airplanesList[i].toDate}</div>
                    </div>
                    <div class="plane-price">Giá: ${airplanesList[i].priceStr} VND</div>
                </div>
                <div class="lower-lower-plane">
                    <button onclick="viewplane(${airplanesList[i].id})">Xem</button>
                </div>
            </div>
        </div>
        `;
  }
};
