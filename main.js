let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Load tasks from local storage when the page loads
window.addEventListener('load', loadTasksFromLocalStorage);

// Add Task
submit.onclick = function (event) {
  event.preventDefault();

  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty input field
  } else {
    alert("Please Fill This Field");
  }
};

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push task to array of tasks
  arrayOfTasks.push(task);
  // Add tasks to page
  addElementToPageFrom(arrayOfTasks);
  // Save tasks to local storage
  saveTasksToLocalStorage();
}

function addElementToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";

  // Looping on array of tasks
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.classList.add('completed');
    }
    div.setAttribute("data-id", task.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "complete";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleCompleteTask(task.id);

    const span = document.createElement("span");
    span.className = "task-title";
    span.appendChild(document.createTextNode(task.title));
    span.onclick = () => editTask(task.id);

    const delSpan = document.createElement("span");
    delSpan.className = "del";
    delSpan.appendChild(document.createTextNode("Delete"));

    div.appendChild(checkbox);
    div.appendChild(span);
    div.appendChild(delSpan);

    tasksDiv.appendChild(div);
  });
}

function toggleCompleteTask(taskId) {
  const task = arrayOfTasks.find(task => task.id == taskId);
  task.completed = !task.completed;
  addElementToPageFrom(arrayOfTasks);
  saveTasksToLocalStorage();
}

function editTask(taskId) {
  const task = arrayOfTasks.find(task => task.id == taskId);
  const newTitle = prompt("Edit the task:", task.title);
  if (newTitle) {
    task.title = newTitle;
    addElementToPageFrom(arrayOfTasks);
    saveTasksToLocalStorage();
  }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    arrayOfTasks = tasks;
    addElementToPageFrom(arrayOfTasks);
  }
}

// Delete Task
tasksDiv.addEventListener("click", function (event) {
  if (event.target.classList.contains("del")) {
    const taskId = event.target.parentElement.getAttribute("data-id");
    deleteTask(taskId); // Delete Task From Array Of Tasks
  }
});

function deleteTask(taskId) {
  // Update array of tasks
  arrayOfTasks = arrayOfTasks.filter(task => task.id != taskId);
  // Update tasks in page
  addElementToPageFrom(arrayOfTasks);
  // Save updated tasks to local storage
  saveTasksToLocalStorage();
}
