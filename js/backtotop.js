import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    document.querySelector("#navbar-action").innerHTML = `
<a href="login.html">Đăng nhập</a>
`;
  } else {
    document.querySelector("#navbar-action").innerHTML = `
<span style="color: white">${user.displayName || user.email}</span>
<a href="javascript:;" onclick="logout()">Đăng xuất</a>
`;
  }
});

window.logout = () => signOut(auth);

window.addEventListener("scroll", function () {
  var backToTopButton = document.getElementById("back-to-top");
  if (window.pageYOffset > 100) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

document.getElementById("back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
