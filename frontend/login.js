const API_URL = "http://localhost:5000/api";

document
  .getElementById("loginBtn")
  .addEventListener("click", async () => {

    const email = document
      .getElementById("email")
      .value
      .trim();

    const password = document
      .getElementById("password")
      .value
      .trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem(
          "token",
          data.token
        );

        alert("Login Successful");

        window.location.href =
          "dashboard.html";

      } else {

        alert(
          data.message ||
          "You are not registered or password is incorrect"
        );

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

    }

});