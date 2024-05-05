import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { auth, db } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
  const bookingsRef = collection(db, `bookings-${user.uid}`);

  getDocs(bookingsRef)
    .then((snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        image: doc.data().image,
        phoneNumber: doc.data().phoneNumber,
        startDate: doc.data().startDate,
        endDate: doc.data().endDate,
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

    <img src="${booking.image}" alt="Hotel 1" />
    <div class="details">
      <h2>${booking.title}</h2>
      <p class="location">${booking.description}</p>
      <p class="price">$${booking.price}/night</p>
      <p>Phone Number: ${booking.phoneNumber}</p>
      <p>Start Date: ${booking.startDate}</p>
      <p>End Date: ${booking.endDate}</p>
    </div>
    `;
      bookingsContainer.appendChild(bookingElement);
    });
  };
});
