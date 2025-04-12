// DOM Elements
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const prioritySelect = document.getElementById("prioritySelect");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a task to the DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");
    taskItem.innerHTML = `
        <div class="task-content">
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="task-checkbox">
            <span class="task-name">${task.name}</span>
            <span class="task-due">${task.dueDate}</span>
            <span class="task-priority">${task.priority}</span>
        </div>
        <button class="delete-task-button">Delete</button>
    `;

    // Handle task checkbox change
    taskItem.querySelector(".task-checkbox").addEventListener("change", (event) => {
        task.completed = event.target.checked;
        saveTasksToStorage();
    });

    // Handle delete task
    taskItem.querySelector(".delete-task-button").addEventListener("click", () => {
        taskList.removeChild(taskItem);
        removeTaskFromStorage(task);
    });

    taskList.appendChild(taskItem);
}

// Remove task from storage
function removeTaskFromStorage(taskToRemove) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task !== taskToRemove);
    saveTasks(updatedTasks);
}

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (!taskName || !dueDate) {
        alert("Please fill in both the task name and due date.");
        return;
    }

    const newTask = {
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    // Add task to the DOM and storage
    addTaskToDOM(newTask);
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    saveTasks(tasks);

    // Clear the input fields
    taskInput.value = '';
    dueDateInput.value = '';
}

// Event listener for Add Task button
addTaskButton.addEventListener("click", addTask);

// Initialize the app (load tasks from storage)
document.addEventListener("DOMContentLoaded", loadTasks);
