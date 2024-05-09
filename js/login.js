// import { app, auth } from "./database.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  // getAuth,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAugehBPfp7h0k5uUtXTPNQWSH4HL3d_rQ",
  authDomain: "nps-jsi18-hb-vu.firebaseapp.com",
  projectId: "nps-jsi18-hb-vu",
  storageBucket: "nps-jsi18-hb-vu.appspot.com",
  messagingSenderId: "1059245847176",
  appId: "1:1059245847176:web:950b2773005e6a4f7ba53d",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getUserData } from "./database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// let user = [];
// localStorage.setItem("user", JSON.stringify(user));

const signinForm = document.getElementById("signinForm");
// console.log("signinForm: ", signinForm);
let currentUser = localStorage.getItem("user");

if (currentUser != "" && currentUser != null) {
  window.location.href = "../html/index.html";
}

document.getElementById("signin").addEventListener("click", (e) => {
  e.preventDefault();

  console.log("Signing");

  const dataSignIn = {
    email: signinForm.email.value.trim(),
    password: signinForm.password.value,
  };

  // console.log(dataSignIn);

  checkSignInData(dataSignIn);
});

const checkSignInData = (data) => {
  let count = 0;

  if (!data.email.includes("@")) {
    document.getElementById("signInEmailError").innerHTML =
      "Email không hợp lệ";
  } else {
    document.getElementById("signInEmailError").innerHTML = "";
    count++;
  }

  if (data.password == "") {
    document.getElementById("signInPasswordError").innerHTML =
      "Vui lòng nhập mật khẩu của bạn";
  } else {
    document.getElementById("signInPasswordError").innerHTML = "";
    count++;
  }

  if (count == 2) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Signed in!");
        // currentUser.push(user);
        localStorage.setItem("user", JSON.stringify(user));

        await getUserData();

        if (!user.emailVerified) {
          signOut(auth);

          alert("Email is not verified");
          throw new Error("Email is not verified");
        }

        document.getElementById("signinTitle").innerHTML =
          "Sign In Successfully!";
        setTimeout(() => {
          window.location.href = "../html/index.html";
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        document.getElementById("signInEmailError").innerHTML =
          "Email hoặc mật khẩu không đúng";
      });
  }
};
