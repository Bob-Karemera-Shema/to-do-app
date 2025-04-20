window.addEventListener('load', function () {
    const inputForm = document.querySelector('#input-form');
    const taskList = document.querySelector('#task-list');
    const filter = document.querySelector('#filter');
    const sort = document.querySelector('#sort');
    const inputTask = document.querySelector('#input-task');
    const inputDate = document.querySelector('#input-date');
    const tasksArray = [];

    function saveTask(task) {
        tasksArray.push(task);
    }

    function deleteTask(index) {
        tasksArray.splice(index, 1);
    }

    function editTask(task, date, index) {
        tasksArray[index].task = task;
        tasksArray[index].date = date;
    }

    function markAsComplete(index) {
        tasksArray[index].complete = true;
    }

    function displayTaskList(tasks) {
        taskList.innerHTML = tasks.map((task, index) => (
            `
                <div id=${index} class="task">
                    <div class="content">
                        <input type="text" value=${task.title} class=${task.complete ? "completed" : ""} readonly />
                        <input type="text" value=${task.date} class=${task.complete ? "completed" : ""} readonly />
                    </div>
                    <div class="task-btns">
                        <button class="toggle" style="display:${task.complete ? "none" : "unset"};">Complete</button>
                        <button class="edit" style="display:${task.complete ? "none" : "unset"};">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            `
        )).join('');
    }

    function filterTaskList(e) {
        if (e.target.value === 'all') {
            displayTaskList(tasksArray);
        } else if (e.target.value === 'complete') {
            const toBeDisplayed = tasksArray.filter(task => task.complete === true);
            displayTaskList(toBeDisplayed);
        } else {
            const toBeDisplayed = tasksArray.filter(task => task.complete === false);
            displayTaskList(toBeDisplayed);
        }
    }

    function sortTaskList(e) {
        if (e.target.value === 'none') {
            displayTaskList(tasksArray);
        } else if (e.target.value === 'ascending') {
            const ascending = [...tasksArray].sort((a, b) => new Date(a.date) - new Date(b.date));
            displayTaskList(ascending);
        } else {
            const descending = [...tasksArray].sort((a, b) => new Date(b.date) - new Date(a.date));
            displayTaskList(descending);
        }
    }

    inputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = inputTask.value;
        const date = inputDate.value;

        saveTask({
            title: task,
            date,
            complete: false
        });

        inputTask.value = "";
        inputDate.value = "";

        displayTaskList(tasksArray);
    });

    taskList.addEventListener('click', function (e) {
        if (e.target.classList[0] === 'delete') {
            const taskEl = e.target.closest('.task');
            deleteTask(parseInt(taskEl.id));
            taskList.removeChild(taskEl);
        } else if (e.target.classList[0] === 'toggle') {
            const taskEl = e.target.closest('.task');
            const taskInputs = taskEl.querySelectorAll('input');
            const taskBtns = taskEl.querySelectorAll('button');

            taskInputs.forEach(taskInput => taskInput.classList.add('completed'));

            markAsComplete(taskEl.id);

            taskBtns[0].style.display = 'none';
            taskBtns[1].style.display = 'none';
        } else if (e.target.classList[0] === 'edit') {
            const taskEl = e.target.closest('.task');
            const taskInputs = taskEl.querySelectorAll('input');

            taskInputs.forEach((taskInput, index) => {
                taskInput.removeAttribute('readonly');
                taskInput.classList.add('editable');

                if (index === 0) taskInput.focus();
                if (index === 1) taskInput.type = 'date';
            });

            e.target.textContent = 'Save';
            e.target.classList.remove('edit');
            e.target.classList.add('save');
        } else if (e.target.classList[0] === 'save') {
            const taskEl = e.target.closest('.task');
            const taskInputs = taskEl.querySelectorAll('input');

            if (!taskInputs[0].value || !taskInputs[1].value) {
                alert('Please fill in all the fields!');
                return;
            };

            editTask(taskInputs[0].value, taskInputs[1].value, taskEl.id);

            taskInputs.forEach((taskInput, index) => {
                taskInput.setAttribute('readonly', 'readonly');
                taskInput.classList.remove('editable');
                if (index === 1) taskInput.type = 'text';
            });

            e.target.textContent = 'Edit';
            e.target.classList.remove('save');
            e.target.classList.add('edit');
        }
    });

    filter.addEventListener('change', filterTaskList);

    sort.addEventListener('change', sortTaskList);
});