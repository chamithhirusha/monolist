const inputField = document.querySelector(".inputField");
const addButton = document.querySelector(".addButton");
const taskList = document.getElementById("taskList");
const themeSwitch = document.querySelector(".theme-switch");
const themeIcon = themeSwitch.querySelector("img");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDarkMode = localStorage.getItem("theme") === "dark";

// Apply saved theme and icon
document.body.classList.toggle("dark", isDarkMode);
themeIcon.src = isDarkMode ? "assets/dark.svg" : "assets/light.svg";

// Render saved tasks
tasks.forEach((task) => renderTask(task.text, task.done));

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(text, done = false) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = done;

  const taskText = document.createElement("p");
  taskText.className = "task-text";
  taskText.textContent = text;
  if (done) taskText.classList.add("strike");

  const removeBtn = document.createElement("button");
  removeBtn.className = "task-remove";
  removeBtn.innerHTML = `<img class="remove-icon" src="assets/remove.svg" width="18px" />`;

  checkbox.addEventListener("change", () => {
    taskText.classList.toggle("strike", checkbox.checked);
    const index = [...taskList.children].indexOf(taskDiv);
    tasks[index].done = checkbox.checked;
    saveTasks();
  });

  removeBtn.addEventListener("click", () => {
    const index = [...taskList.children].indexOf(taskDiv);
    tasks.splice(index, 1);
    taskDiv.classList.add("removing");
    saveTasks();
    setTimeout(() => taskDiv.remove(), 300);
  });

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(removeBtn);
  taskList.appendChild(taskDiv);

  // Trigger animation
  requestAnimationFrame(() => {
    taskDiv.classList.add("show");
  });
}

addButton.addEventListener("click", () => {
  const text = inputField.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    renderTask(text);
    saveTasks();
    inputField.value = "";
  }
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addButton.click();
});

themeSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  isDarkMode = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Animate icon change
  themeIcon.style.opacity = "0";
  setTimeout(() => {
    themeIcon.src = isDarkMode ? "assets/dark.svg" : "assets/light.svg";
    themeIcon.style.opacity = "1";
  }, 200);
});
