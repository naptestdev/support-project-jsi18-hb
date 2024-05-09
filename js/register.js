// import { app, auth } from "./database.js";

import {
    collection,
    getDocs,
    getFirestore,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAugehBPfp7h0k5uUtXTPNQWSH4HL3d_rQ",
    authDomain: "nps-jsi18-hb-vu.firebaseapp.com",
    projectId: "nps-jsi18-hb-vu",
    storageBucket: "nps-jsi18-hb-vu.appspot.com",
    messagingSenderId: "1059245847176",
    appId: "1:1059245847176:web:950b2773005e6a4f7ba53d"
};

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    getAuth,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const signupForm = document.getElementById("signupForm");
console.log("signupForm: ", signupForm);

// const pushUserDate = (data) => {
// }

if(currentUser != "" && currentUser != null) {
    window.location.href = "../html/index.html";
}

const addUser = async (user, id) => {
    await setDoc(doc(db, "users", id), user);
}

// addUser(
//     {
//         firstName: "test",
//         lastName: "test",
//         email: "test email",
//         password: "password"
//     },
//     "testID"
// );

document.getElementById("signup").addEventListener("click", (e) => {
    e.preventDefault();

    console.log("Clicked on signup!");

    const dataSignUp = {
        firstName: signupForm.firstName.value.trim(),
        lastName: signupForm.lastName.value.trim(),
        email: signupForm.email.value.trim(),
        password: signupForm.password.value,
        confirmPassword: signupForm.confirmPassword.value,
    };

    checkSignUpData(dataSignUp);

    

});

const checkSignUpData = (data) => {

    let count = 0;
    
    const lowerCaseLetter = /[a-z]/g;
    const upperCaseLetter = /[A-Z/]/g;
    const numbers = /[0-9]/g;

    if(data.firstName == "") {
        document.getElementById("firstNameError").innerHTML = "Họ của bạn phải chứa ít nhất 1 chữ";
    } else {
        document.getElementById("firstNameError").innerHTML = "";
        count++;
    }
    if(data.lastName == "") {
        document.getElementById("lastNameError").innerHTML = "Tên của bạn phải chứa ít nhất 1 chữ";
    } else {
        document.getElementById("lastNameError").innerHTML = "";
        count++;
    }
    if(!data.email.includes("@")) {
        document.getElementById("emailError").innerHTML = "Email không hợp lệ"
    } else {
        document.getElementById("emailError").innerHTML = "";
        count++;
    }
    if(data.password == "") {
        document.getElementById("passwordError").innerHTML = "Mật khẩu của bạn phải chứa ít nhất 6 kí tự"
    } else if(!data.password.match(lowerCaseLetter)) {
        document.getElementById("passwordError").innerHTML = "Mật khẩu của bạn phải chứa ít nhất 1 chữ thường"
    } else if(!data.password.match(upperCaseLetter)) {
        document.getElementById("passwordError").innerHTML = "Mật khẩu của bạn phải chứa ít nhất 1 chữ hoa"
    } else if(!data.password.match(numbers)) {
        document.getElementById("passwordError").innerHTML = "Mật khẩu của bạn phải chứa ít nhất 1 chữ số"
    } else {
        document.getElementById("passwordError").innerHTML = "";
        count++;
    }
    if(data.confirmPassword != data.password) {
        document.getElementById("confirmPasswordError").innerHTML = "Mật khẩu xác nhận không chính xác"
    } else {
        document.getElementById("confirmPasswordError").innerHTML = "";
        count++;
    }

    // if(
    //     data.firstName !== "" &&
    //     data.lastName !== "" &&
    //     data.email !== "" &&
    //     data.password !== "" &&
    //     data.confirmPassword !== ""
    // ) {
    //     return data;
    //     // count++;
    // }

    // 5
    if(count == 5) {
        createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        ).then((userCredential) => {
            sendEmailVerification(userCredential.user)
            .then(() => {
                console.log("Verification");
                addUser({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    cart: [
                        {
                            airplanes: []
                        },
                        {
                            tours: []
                        },
                    ],
                }, userCredential.user.uid)
                console.log(userCredential.user)
                document.getElementById("signupTitle").innerHTML = "Sign Up Successfully!";
                setTimeout(() => {window.location.href = "../html/index.html"}, 3000);
            })
            .catch((error) => {
                console.log("Error signing up with email and password: ", error);
            })
        })
    }
}