import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

const trendingTours = document.getElementById("trendingTours");

const firebaseConfig = {
  apiKey: "AIzaSyAugehBPfp7h0k5uUtXTPNQWSH4HL3d_rQ",
  authDomain: "nps-jsi18-hb-vu.firebaseapp.com",
  projectId: "nps-jsi18-hb-vu",
  storageBucket: "nps-jsi18-hb-vu.appspot.com",
  messagingSenderId: "1059245847176",
  appId: "1:1059245847176:web:950b2773005e6a4f7ba53d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const pushTours = (tours) => {
  let toursList = [];
  tours.forEach((tour) => {
    toursList.push(tour);
  });
  localStorage.setItem("toursList", JSON.stringify(toursList));
};

export const getUserData = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    firstName: doc.data().firstName,
    lastName: doc.data().lastName,
    email: doc.data().email,
    password: doc.data().password,
  }));
  if (
    localStorage.getItem("user") != "" ||
    localStorage.getItem("user") != null
  ) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == JSON.parse(localStorage.getItem("user") || "{}").uid) {
        const temp = {
          firstName: users[i].firstName,
          lastName: users[i].lastName,
          email: users[i].email,
          password: users[i].password,
          uid: users[i].id,
        };
        localStorage.setItem("userData", JSON.stringify(temp));
      }
    }
  }
};

getUserData();

const getTours = async () => {
  const querySnapshot = await getDocs(collection(db, "tours"));
  const tours = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    image: doc.data().image,
    name: doc.data().name,
    negativeRates: doc.data().negativeRates,
    newPrice: doc.data().newPrice,
    // newPriceStr: doc.data().newPriceStr,
    oldPrice: doc.data().oldPrice,
    // oldPriceStr: doc.data().oldPriceStr,
    positiveRates: doc.data().positiveRates,
    description: doc.data().description,
  }));
  pushTours(tours);
};

const pushAirplanes = (airplanes) => {
  let airplanesList = [];
  airplanes.forEach((airplane) => {
    airplanesList.push(airplane);
  });
  localStorage.setItem("airplanes", JSON.stringify(airplanesList));
};

const getAirplanes = async () => {
  const querySnapshot = await getDocs(collection(db, "airplanes"));
  const airplanes = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    firm: doc.data().firm,
    from: doc.data().from,
    fromDate: doc.data().fromDate,
    price: doc.data().price,
    priceStr: doc.data().priceStr,
    to: doc.data().to,
    toDate: doc.data().toDate,
  }));

  pushAirplanes(airplanes);
};

getTours();
getAirplanes();

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    console.log("signed out!");
  }
});

const signOutUser = (user) => {
  signOut(auth)
    .then(() => {
      console.log(`Signed out ${user}`);
      localStorage.removeItem("user");
      localStorage.removeItem("userData");
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
};

document.getElementById("test-signout")?.addEventListener("click", (e) => {
  // e.preventDefault();
  signOutUser(localStorage.getItem("user"));
});
