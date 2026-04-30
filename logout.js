window.fazerLogout = function () {
  signOut(auth)
    .then(() => {
      alert("Saiu da conta");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error);
    });
};