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
  const emailVerf = document.querySelector("#email_signup_verf").value.trim();
  const password = document
    .querySelector("#exampleInputPassword1")
    .value.trim();
  const passwordVerf = document
    .querySelector("#exampleInputPassword1-verf")
    .value.trim();
  const neighbohood = document.querySelector("#city").value.trim();

  if (fullName && email && password) {
    if (email !== emailVerf && password !== passwordVerf) {
      window.alert("Email and Password Do Not Match Respective Confirm Fields");
      return;
    }
    if (email !== emailVerf) {
      window.alert("Emails Do Not Match");
      return;
    }
    if (password !== passwordVerf) {
      window.alert("Passwords Do Not Match");
      return;
    }
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
      document.location.replace("/");
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
