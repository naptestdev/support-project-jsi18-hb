const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");

const currentUser = localStorage.getItem("user");
// const currentUserData = JSON.parse(localStorage.getItem("userData"));

const getDeviceType = () => {
  const ua = navigator.userAgent;

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }

  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

console.log(getDeviceType());

const getUserFirstLetter = () => {
  const temp = [];
  console.log(JSON.parse(localStorage.getItem("userData")));
  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("userData")).lastName.length;
    i++
  ) {
    temp.push(JSON.parse(localStorage.getItem("userData")).lastName[i]);
  }
  return temp[0];
};

// console.log(currentUser);

if (getDeviceType() == "desktop") {
  if (currentUser == "" || currentUser == null) {
    console.log("no user");
    navbar.innerHTML = `
        <div class="logo">
            <a href="../html/index.html">Something</a>
        </div>
        <div class="pages">
            <a href="../html/index.html">Trang chủ</a>
            <a href="../html/tours.html">Tours</a>
            <a href="../html/airplane.html">Đặt vé máy bay</a>
            <a href="#">Đặt khách sạn</a>
        </div>
        <div class="user-area">
            <a href="../html/signin.html">Sign in</a>
            <a href="../html/signup.html">Sign up</a>
        </div>
        `;
  } else {
    navbar.innerHTML = `
        <div class="logo">
            <a href="../html/index.html">Something</a>
        </div>
        <div class="pages">
            <a href="../html/index.html">Trang chủ</a>
            <a href="../html/tours.html">Tours</a>
            <a href="../html/airplane.html">Đặt vé máy bay</a>
            <a href="#">Đặt khách sạn</a>
        </div>
        <div class="user-area">
            <a style="white-space: nowrap" href="cart.html">Vé đã đặt</a>
            <div class="diy-avt">${getUserFirstLetter()}</div>
            <a href="" id="test-signout">${
              JSON.parse(localStorage.getItem("userData")).firstName
            } ${JSON.parse(localStorage.getItem("userData")).lastName}</a>
        </div>
        `;
  }
} else if (getDeviceType() == "mobile") {
  if (currentUser == "" || currentUser == null) {
    console.log("no user");
    navbar.innerHTML = `
        <div class="menu">
            <div class="open-menu"><i class="fa-solid fa-bars"></i></div>
            <div class="forward">
                
            </div>
        </div>
        <div class="logo">
            <a href="../html/index.html">Something</a>
        </div>
        <div style="margin-right: 20px"></div>
        `;
  } else {
    navbar.innerHTML = `
        <div class="logo">
            <a href="../html/index.html">Something</a>
        </div>
        <div class="pages">
            <a href="../html/index.html">Trang chủ</a>
            <a href="../html/tours.html">Tours</a>
            <a href="../html/airplane.html">Đặt vé máy bay</a>
            <a href="#">Đặt khách sạn</a>
        </div>
        <div class="user-area">
            <div class="diy-avt">${getUserFirstLetter()}</div>
            <a href="" id="test-signout">${
              JSON.parse(localStorage.getItem("userData")).firstName
            } ${JSON.parse(localStorage.getItem("userData")).lastName}</a>
        </div>
        `;
  }
}

footer.innerHTML = `
<div class="upper-footer">
    <div class="footer-services">
        <h5>Dịch vụ:</h5>
        <div><a href="../html/tours.html">Đặt tours</a></div>
        <div><a href="../html/airplane.html">Đặt vé máy bay</a></div>
        <div><a href="">Đặt vé khách sạn</a></div>
    </div>
    <div class="footer-informations">
        <h5>Thông tin:</h5>
        <div><i class="fa-solid fa-phone"></i> +84 129840981</div>
        <div><i class="fa-solid fa-envelope"></i> visiting@visit.com</div>
    </div>
</div>
<div class="lower-footer">
    <div class="copyright"><i class="fa-regular fa-copyright"></i> No Copyright 2024</div>
</div>
`;
