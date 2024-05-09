// const signInBtn = document.getElementById("signIn");
// const signUpBtn = document.getElementById("signUp");
// const fistForm = document.getElementById("form1");
// const secondForm = document.getElementById("form2");
// const container = document.querySelector(".container");

// signInBtn.addEventListener("click", () => {
// 	container.classList.remove("right-panel-active");
// });

// signUpBtn.addEventListener("click", () => {
// 	container.classList.add("right-panel-active");
// });

// fistForm.addEventListener("submit", (e) => e.preventDefault());
// secondForm.addEventListener("submit", (e) => e.preventDefault());


import {
	signInWithEmailAndPassword,
	signOut,
  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  import { auth } from "../js/firebase.js";
  
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
	console.log("hehe")
	e.preventDefault();
  
	document.querySelector("button[type=submit]").innerText = "Sign In...";
  
	document
	  .querySelector("button[type=submit]")
	  .setAttribute("disabled", "true");
  
	const email = form.email.value.trim();
	const password = form.password.value;
  
	signInWithEmailAndPassword(auth, email, password)	
	  .then((userCredential) => {
		const user = userCredential.user;
		console.log(user);
		if (!user.emailVerified) {
		  signOut(auth);
		  throw { code: "Email not verified", message: "chuwa dang ki" };
		}
		location.href = "../html/main.html";
	  })
	  .catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorCode, errorMessage);
		alert(errorCode);
	  })
	  .finally(() => {
		document.querySelector("button[type=submit]").innerText = "Sign In";
		document.querySelector("button[type=submit]").removeAttribute("disabled");
	  });
  });
  