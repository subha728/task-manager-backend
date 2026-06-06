const API_URL = "https://task-manager-backend-three-ruby.vercel.app";

const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// Logout
document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    window.location.href = "login.html";
  });

// Create Task
document
  .getElementById("createTaskBtn")
  .addEventListener("click", async () => {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;

    if (!title || !description || !status) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          status
        })
      });

      const data = await response.json();

      if (response.ok) {

        alert("Task created successfully");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("status").value = "";

        loadTasks();

      } else {

        alert(data.message || "Failed to create task");

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

    }

  });

// Load Tasks
async function loadTasks() {

  try {

    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

   const tasks = await response.json();

document.getElementById("taskStats").innerText =
  `Total Tasks: ${tasks.length}`;

const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    if (!Array.isArray(tasks)) {
      taskList.innerHTML =
        "<p>No tasks available</p>";
      return;
    }

    tasks.forEach((task) => {

  taskList.innerHTML += `
    <div class="task-card">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Status:</strong> ${task.status}</p>

      <button onclick="editTask('${task._id}')">
        Edit
      </button>

      <button onclick="deleteTask('${task._id}')">
        Delete
      </button>
    </div>
  `;

});

  } catch (error) {

    console.error(error);

  }

}

// Delete Task
async function deleteTask(id) {

  try {

    const response = await fetch(
      `${API_URL}/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.ok) {

      alert("Task deleted successfully");
      loadTasks();

    }

  } catch (error) {

    console.error(error);
    alert("Delete failed");

  }

}

async function editTask(id) {

  const title = prompt("Enter new title");
  if (!title) return;

  const description = prompt("Enter new description");
  if (!description) return;

  const status = prompt(
    "Enter status (Pending, In Progress, Completed)"
  );
  if (!status) return;

  try {

    const response = await fetch(
      `${API_URL}/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          status
        })
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("Task updated successfully");
      loadTasks();

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);
    alert("Update failed");

  }

}

// Initial Load
loadTasks();