
const inputForm = document.querySelector('#input-form');  // input form
const taskList = document.querySelector('#task-list');  // task list div
const filter = document.querySelector('#filter');   // filter selector
const sort = document.querySelector('#sort');   // sort selector
const inputTask = document.querySelector('#input-task');    // task title input
const inputDate = document.querySelector('#input-date');    // task date input
const tasksArray = [];  // array to store tasks

function saveTask(task) {
    tasksArray.push(task);
}

function deleteTask(index) {
    tasksArray.splice(index, 1);
}

function editTask(task, date, index) {
    tasksArray[index].task = task;
    tasksArray[index].date = new Date(date);
}

function toggleComplete(index) {
    tasksArray[index].completed = !tasksArray[index].completed;
}

function displayTaskList(tasks) {
    // Use template literals to dynamically display tasks
    taskList.innerHTML = tasks.map((task, index) => {
        const { title, date, completed } = task;
        return `
                <div id=${index} class="task">
                    <div class="content">
                        <input type="checkbox" class="toggle" ${completed ? 'checked' : ''} />
                        <div class="task-fields-container">
                            <input type="text" value="${title}" class="${completed ? "completed" : ""}" readonly />
                            <input type="text" value="${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}" class="${completed ? "completed" : ""}" min="${getMinDate()}" readonly=true />
                        </div>
                    </div>
                    <div class="task-btns">
                        <button class="${completed ? "edit hide" : "edit"}">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            `;
    }).join('');
}

function filterTaskList(e) {
    if (e.target.value === 'all') {
        displayTaskList(tasksArray);
    } else if (e.target.value === 'complete') {
        const toBeDisplayed = tasksArray.filter(task => task.completed === true);
        displayTaskList(toBeDisplayed);
    } else {
        const toBeDisplayed = tasksArray.filter(task => task.completed === false);
        displayTaskList(toBeDisplayed);
    }
}

function sortTaskList(e) {
    if (e.target.value === 'none') {
        displayTaskList(tasksArray);
    } else if (e.target.value === 'ascending') {
        const ascending = [...tasksArray].sort((a, b) => a.date - b.date);
        displayTaskList(ascending);
    } else {
        const descending = [...tasksArray].sort((a, b) => b.date - a.date);
        displayTaskList(descending);
    }
}

function getMinDate() {
    // Get today's date to set restrictions on past dates
    const today = new Date(Date.now());
    return `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate()}`;
}

async function fetchTasks() {
    // fetch tasks stored on a remote server
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    data.slice(0, 10).forEach(task => {
        saveTask({
            title: task.title,
            date: new Date(Date.now()),
            completed: task.completed
        });
    });

    displayTaskList(tasksArray);

}

fetchTasks();

// Event listener for task submission
inputForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const task = inputTask.value;
    const date = inputDate.value;

    saveTask({
        title: task,
        date: new Date(date),
        completed: false
    });

    inputTask.value = "";
    inputDate.value = "";

    displayTaskList(tasksArray);
});

// Set the min date for a task to avoid past dates
inputDate.min = getMinDate();

// Event listener for click event on a task
// These can be edit, delete, complete
taskList.addEventListener('click', function (e) {
    if (e.target.classList[0] === 'delete') {
        const taskEl = e.target.closest('.task');
        deleteTask(parseInt(taskEl.id));
        taskList.removeChild(taskEl);
    } else if (e.target.classList[0] === 'toggle') {
        const taskEl = e.target.closest('.task');
        const taskInputs = taskEl.querySelectorAll('input');
        const taskBtns = taskEl.querySelectorAll('button');

        taskInputs.forEach(taskInput => taskInput.classList.toggle('completed'));

        toggleComplete(taskEl.id);

        taskBtns[0].classList.toggle('hide');
        console.log(taskBtns[0]);
    } else if (e.target.classList[0] === 'edit') {
        const taskEl = e.target.closest('.task');
        const taskInputs = taskEl.querySelectorAll('input');

        taskInputs.forEach((taskInput, index) => {
            if (index > 0) {
                taskInput.removeAttribute('readonly');
                taskInput.classList.add('editable');
            }

            if (index === 1) taskInput.focus();
            if (index === 2) taskInput.type = 'date';
        });

        e.target.textContent = 'Save';
        e.target.classList.remove('edit');
        e.target.classList.add('save');
    } else if (e.target.classList[0] === 'save') {
        const taskEl = e.target.closest('.task');
        const taskInputs = taskEl.querySelectorAll('input');

        if (!taskInputs[1].value || !taskInputs[2].value) {
            alert('Please fill in all the fields!');
            return;
        };

        editTask(taskInputs[1].value, taskInputs[2].value, taskEl.id);

        taskInputs.forEach((taskInput, index) => {
            if (index > 0) {
                taskInput.setAttribute('readonly', 'readonly');
                taskInput.classList.remove('editable');
            }
            if (index === 2) taskInput.type = 'text';
        });

        e.target.textContent = 'Edit';
        e.target.classList.remove('save');
        e.target.classList.add('edit');
    }
});

// Event listener for changes in the filter select element
filter.addEventListener('change', filterTaskList);

// Event listener for changes in the sort select element
sort.addEventListener('change', sortTaskList);