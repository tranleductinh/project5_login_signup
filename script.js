//tạo mảng users
let users = [];
//generate id theo thời gian hiện tại
function generateId() {
  return new Date().getTime();
}
console.log(generateId());
//tạo function save users vào localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}
// tạo vadlidate signup
function validateSignup(firstname, email, password, repeatPassword) {
  let error = [];
  let errorFields = [];
  //kiểm tra firstname
  if (!firstname) {
    error.push("Please enter your name. ");
    errorFields.push("firstname");
  }
  if (!email) {
    error.push("Please enter your email. ");
    errorFields.push("email");
  }
  if (!password) {
    error.push("Please enter your password. ");
    errorFields.push("password");
  } else if (password.length < 8) {
    error.push("Password must be at least 8 characters. ");
    errorFields.push("password_length");
  }
  if (!repeatPassword) {
    error.push("Please repeat your password. ");
    errorFields.push("repeatPassword", "password");
  }
  return {
    error,
    errorFields,
  };
}

//tạo validate login
function validateLogin(email, password) {
  let error = [];
  let errorFields = [];
  if (!email) {
    error.push("Please enter your email. ");
    errorFields.push("email");
  }
  if (!password) {
    error.push("Please enter your password. ");
    errorFields.push("password");
  }
  return {
    error,
    errorFields,
  };
}

//tạo main function register user
function registerUser(firstname, email, password, repeatPassword) {
  //tạo const kiểm tra dữ liệu với function validateSignup
  const { error, errorFields } = validateSignup(
    firstname,
    email,
    password,
    repeatPassword
  );
  //tạo if kiểm tra dữ liệu với function validateSignup
  if (error.length > 0) {
    showError(error, errorFields);
    return false;
  }
  //kiểm tra email có tồn tại hay chưa
  if (users.find((user) => user.email === email)) {
    error.push("Email already exists. ");
    errorFields.push("email");
    showError(error, errorFields);
    return false;
  }
  let id = generateId();
  let user = {
    id,
    firstname,
    email,
    password,
    repeatPassword,
  };
  users.push(user);
  saveUsers();
  //direct tới trang index.html
  window.location.href = "./index.html";
  return true;
}

//tạo main function login user
function loginUser(email, password) {
  const { error, errorFields } = validateLogin(email, password);
  if (error.length > 0) {
    showError(error, errorFields);
    return false;
  }
  if (users.find((user) => user.email === email)) {
    if (users.find((user) => user.password === password)) {
      window.location.href = "./index.html";
      return true;
    }
  } else {
    error.push("Email or Password is incorrect. ");
    errorFields.push("email", "password");
    showError(error, errorFields);
    return false;
  }
}

//tạo function showError
function showError(error, errorFields) {
  const errorList = document.getElementById("error");
  errorList.innerHTML = "";
  //dùng forEach truyền lỗi vào span
  error.forEach((err, index) => {
    let errorElement = document.createElement("span");
    errorElement.textContent = err;
    errorElement.className = "error";
    errorElement.id = errorFields[index];
    errorElement.style.color = "red";
    errorList.appendChild(errorElement);
  });
}
//tạo function xử lý sự kiện form
function handleForm(event) {
  event.preventDefault();
  let form = event.target;
  let firstnameInput = form.elements["firstname"];
  let email = form.email.value;
  let password = form.password.value;
  if (firstnameInput) {
    let firstname = form.firstname.value;
    let repeatPassword = form.repeatPassword.value;
    registerUser(firstname, email, password, repeatPassword);
  } else {
    loginUser(email, password);
  }
}
//đặt sư kiện cho form
let form = document.getElementById("form");
form.addEventListener("submit", handleForm);
