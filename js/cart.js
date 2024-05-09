import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { auth, db } from "./database.js";

const toursList = JSON.parse(localStorage.getItem("toursList"));

onAuthStateChanged(auth, (user) => {
  const bookingsRef = collection(db, `tour-${user.uid}`);

  getDocs(bookingsRef)
    .then((snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        fromDate: doc.data().fromDate,
        toDate: doc.data().toDate,
        name: toursList.find((item) => item.id == doc.data().id).name,
        description: toursList.find((item) => item.id == doc.data().id)
          .description,
        image: toursList.find((item) => item.id == doc.data().id).image,
        newPrice: toursList.find((item) => item.id == doc.data().id).newPrice,
      }));
      console.log(bookings);
      renderBookings(bookings);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  const renderBookings = (bookings) => {
    const bookingsContainer = document.querySelector(".container");

    bookings.forEach((booking) => {
      const bookingElement = document.createElement("div");
      bookingElement.classList.add("hotel-room");
      bookingElement.innerHTML = `

    <img src="../assets/${booking.image}" alt="Hotel 1" />
    <div class="details">
      <h2>${booking.name}</h2>
      <p class="price">$${booking.newPrice}/night</p>
      <p>Start Date: ${booking.fromDate}</p>
      <p>End Date: ${booking.toDate}</p>
    </div>
    `;
      bookingsContainer.appendChild(bookingElement);
    });
  };
});
