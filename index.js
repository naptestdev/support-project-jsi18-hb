import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { auth } from "./firebase.js";

// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  // Add active class to target link
  target.parent().addClass("active");
});

// Add active class on another page linked
// ==========================================
$(window).on("load", function () {
  var current = location.pathname;
  console.log(current);
  $("#navbarSupportedContent ul li a").each(function () {
    var $this = $(this);
    // if the current path is like this link, make it active
    if ($this.attr("href").indexOf(current) !== -1) {
      $this.parent().addClass("active");
      $this.parents(".menu-submenu").addClass("show-dropdown");
      $this.parents(".menu-submenu").parent().addClass("active");
    } else {
      $this.parent().removeClass("active");
    }
  });
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var btn = document.getElementById("back-to-top-btn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    document.querySelector("#action-section").innerHTML = /*html*/ `
    <a href="./Log In.html" class="btn btn-primary">Đăng nhập</a>
  `;
  } else {
    document.querySelector("#action-section").innerHTML = /*html*/ `
    <a href="./cart.html">
      <i class="fa-solid fa-cart-shopping cart"></i>
    </a>
    <img style="width: 30px; height: 30px; border-radius: 999px; display: inline" src="https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
      user.displayName
    )}" />
    <button style="display: inline-block" class="btn btn-primary" onclick="window.handleSignOut()">Đăng xuất</button>
  `;
  }
});

window.handleSignOut = () => {
  signOut(auth);
};
