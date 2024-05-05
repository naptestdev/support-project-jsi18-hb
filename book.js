import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { auth, db } from "./firebase.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const title = urlParams.get("title");
const description = urlParams.get("description");
const price = urlParams.get("price");
const image = urlParams.get("image");

document.querySelector(".hotel-room").innerHTML = `
  <img src="${image}" alt="Hotel 1" />
  <div class="details">
    <h2>${title}</h2>
    <p class="location">${description}</p>
    <p class="price">$${price}/night</p>
  </div>
`;

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!auth.currentUser) {
    alert("Please login");
    location.href = "./Log In.html";
  }

  const phoneNumber = form.phoneNumber.value;
  const startDate = form.startDate.value;
  const endDate = form.endDate.value;

  console.log(phoneNumber, startDate, endDate);

  const booking = {
    title,
    description,
    price,
    image,
    phoneNumber,
    startDate,
    endDate,
  };

  addDoc(collection(db, `bookings-${auth.currentUser.uid}`), booking)
    .then(() => {
      alert("Booking successful");
      location.href = "./index.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Error booking: " + error);
    });
});
