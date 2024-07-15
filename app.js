const listContainer = document.getElementById('list-container');
const inputBox = document.getElementById('input-box');

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert('Please enter the text');
    } else {
        const task = document.createElement('li');
        task.textContent = inputBox.value;

        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(task);

        const span = document.createElement('span');
        span.textContent = "\u00D7";
        span.style.right = '0px';
        span.onclick = () => task.remove() && saveData();

        task.appendChild(editButton);
        task.appendChild(span);

        listContainer.appendChild(task);
        inputBox.value = '';

        saveData();
    }
}

// Function to edit a task
function editTask(task) {
    const newText = prompt("Edit the task:", task.firstChild.textContent);
    if (newText !== null) {
        task.firstChild.textContent = newText;
        saveData();
    }
}

// Event listener for checking tasks
listContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
});

// Function to save tasks to local storage
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

// Function to display tasks from local storage
function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    listContainer.querySelectorAll('span').forEach(span => span.onclick = () => span.parentElement.remove() && saveData());
    listContainer.querySelectorAll('button').forEach(button => button.onclick = () => editTask(button.parentElement));
}

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', showTask);