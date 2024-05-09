const lowerCaseLetter = /[a-z]/g;
const upperCaseLetter = /[A-Z/]/g;
const numbers = /[0-9]/g;

// Viết các hàm soát lôi người dùng nhập vào
const controller = {};

// Thêm phương thức () register vào trong đối tượng controller.
controller.register = (dataSignUp) => {
  // Kiểm tra xem các thẻ input có rỗng hay không?
  if (dataSignUp.firstName == "") {
    // Báo lỗi, hiển thị lỗi ở phía dưới thẻ input đó.
    document.getElementById("first-name-error").innerText =
      "*Please input your first name";
  } else {
    // Xóa hết nội dung trong thẻ div lỗi đó như sau:
    document.getElementById("first-name-error").innerText = "";
  }

  // Last name
  if (dataSignUp.lastName == "") {
    // Báo lỗi, hiển thị lỗi ở phía dưới thẻ input đó.
    document.getElementById("last-name-error").innerText =
      "*Please input your last name";
  } else {
    // Xóa hết nội dung trong thẻ div lỗi đó như sau:
    document.getElementById("last-name-error").innerText = "";
  }
  // email
  if (dataSignUp.email == "") {
    // Báo lỗi, hiển thị lỗi ở phía dưới thẻ input đó.
    document.getElementById("email-error").innerText =
      "*Please input your email";
  } else {
    // Xóa hết nội dung trong thẻ div lỗi đó như sau:
    document.getElementById("email-error").innerText = "";
  }

  // password
  if (dataSignUp.password == "") {
    // Báo lỗi, hiển thị lỗi ở phía dưới thẻ input đó.
    document.getElementById("password-error").innerText =
      "*Please input your password";
  } else {
    // Xóa hết nội dung trong thẻ div lỗi đó như sau:
    document.getElementById("password-error").innerText = "";
  }

  //confirm password
  if (!(dataSignUp.confirmPassword == dataSignUp.password)) {
    // Báo lỗi, hiển thị lỗi ở phía dưới thẻ input đó.
    document.getElementById("confirm-password-error").innerText =
      "*Please input your confirm password";
  } else {
    // Xóa hết nội dung trong thẻ div lỗi đó như sau:
    document.getElementById("confirm-password-error").innerText = "";
  }

  ////// Điều kiện riêng cho password:
  // Pass phải có tối thiểu 6 ký tự
  if (dataSignUp.password.length < 6) {
    document.getElementById("password-error").innerHTML =
      "Your password is  must be at least 6 characters long";
  } else if (!dataSignUp.password.match(lowerCaseLetter)) {
    document.getElementById("password-error").innerHTML =
      "Your password must contain a lowercase letter";
  } else if (!dataSignUp.password.match(upperCaseLetter)) {
    document.getElementById("password-error").innerHTML =
      "Your password must contain a uppercase letter";
  } else if (!dataSignUp.password.match(numbers)) {
    document.getElementById("password-error").innerHTML =
      "Your password must contain a number or special characters";
  } else {
    // Thỏa mãn hết mọi điều kiện bên trên => dữ liệu người dùng đăng ký hợp lệ.
    if (
      dataSignUp.firstName !== "" &&
      dataSignUp.lastName !== "" &&
      dataSignUp.email !== "" &&
      dataSignUp.password !== "" &&
      dataSignUp.confirmPassword !== ""
    ) {
    return dataSignUp;
    }
  }
};