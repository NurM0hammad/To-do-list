// Get DOM elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ""; // Clear input field
        saveTasks();
    } else {
        alert("Please enter a task!"); // Input validation
    }
});

// Function to add a task to the list
function addTask(taskText) {
    const li = document.createElement('li');
    li.innerText = taskText;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(li);
        saveTasks();
    });

    // Create update button
    const updateButton = document.createElement('button');
    updateButton.innerText = "Update";
    updateButton.addEventListener('click', function () {
        const updatedTask = prompt("Update your task:", taskText);
        if (updatedTask !== null && updatedTask.trim() !== "") {
            li.innerText = updatedTask;
            li.appendChild(deleteButton);
            li.appendChild(updateButton);
            saveTasks();
        }
    });

    // Append buttons to the task
    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(function (li) {
        tasks.push(li.childNodes[0].nodeValue); // Get task text
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (taskText) {
        addTask(taskText);
    });
}