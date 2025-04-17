const form = document.querySelector('#input-form');
const list = document.querySelector('#todo-list');
const tasks = [];

function createTask(task) {
    tasks.push(task);
}

function deleteTask(index) {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
}

function editTask(index, field, value) {
    tasks[index][field] = value;
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
}

function sort(ascending) {
    tasks.sort((a, b) => ascending ? (a.date - b.date) : (b.date - a.date));
}

function filter(completed) {
    return tasks.filter(task => task.completed === completed);
}

async function fetchTasks() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks.push(...data.slice(0, 10));
    displayItems();
}

function appendItem(item) {
    const { title, date } = item;
    const listItem = document.createElement('li');
    const taskTitle = document.createElement('span');
    const taskDate = document.createElement('span');
    
    taskTitle.textContent = title;
    taskDate.textContent = date;
    listItem.appendChild(taskTitle);
    listItem.appendChild(taskDate);

    list.appendChild(listItem);
}

function displayItems() {
    tasks.forEach(task => appendItem(task));
}

// add submit event to form element
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = {...Object.fromEntries(new FormData(form)), completed: false};

    if(formData.title === "" || formData.date === "") return;
    
    createTask(formData);
    appendItem(formData)
});

fetchTasks();
