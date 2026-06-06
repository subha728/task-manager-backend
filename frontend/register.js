<<<<<<< HEAD
<<<<<<< HEAD
const API_URL = "https://task-manager-backend-three-ruby.vercel.app";
=======
const API_URL = "https://task-manager-backend-bkbl.onrender.com";
>>>>>>> c98ae79 (update frontend API URL)
=======
const API_URL = "https://task-manager-backend-bkbl.onrender.com/api";
>>>>>>> f055d34 (Fix frontend API routes)

document
  .getElementById("registerBtn")
  .addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Registration Successful");
        window.location.href = "login.html";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert(error.message);

    }

});