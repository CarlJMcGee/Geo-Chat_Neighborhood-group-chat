async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document
    .querySelector("#exampleInputPassword1")
    .value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

async function signUpFormHandler(event) {
  event.preventDefault();

  const fullName = document
    .querySelector("#username_signup")
    .value.trim()
    .split(" ");
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];
  const email = document.querySelector("#email_signup").value.trim();
  const password = document
    .querySelector("#exampleInputPassword1")
    .value.trim();
  const neighbohood = document.querySelector("#city").value.trim();

  if (fullName && email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        neighborhood: neighbohood,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // document.location.replace("/");
      console.log(response);
    } else {
      alert(response.statusText);
    }
  }
}
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup_form");

if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);
}

if (signupForm) {
  signupForm.addEventListener("submit", signUpFormHandler);
}
