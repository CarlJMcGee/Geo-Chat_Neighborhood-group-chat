async function logoutFormHandler(e) {
  e.preventDefault();

  const response = await fetch("/api/users/logout", {
    method: "post",
    header: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}
document.querySelector("#log-out").addEventListener("click", logoutFormHandler);
