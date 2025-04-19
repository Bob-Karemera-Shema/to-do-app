window.addEventListener('load', function () {
    const inputForm = document.querySelector('#input-form');
    const taskList = document.querySelector('#task-list');
    const inputTask = document.querySelector('#input-task');
    const inputDate = document.querySelector('#input-date');

    inputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = inputTask.value;
        const date = inputDate.value;

        const task_div = document.createElement('div');
        task_div.classList.add('task');

        const content_div = document.createElement('div');
        content_div.classList.add('content');

        const task_el = document.createElement('input');
        task_el.type = 'text';
        task_el.value = task;
        task_el.setAttribute('readonly', 'readonly');
        task_el.setAttribute('required', 'required');

        const date_el = document.createElement('input');
        date_el.type = 'text';
        date_el.value = date;
        date_el.setAttribute('readonly', 'readonly');
        date_el.setAttribute('required', 'required');

        content_div.appendChild(task_el);
        content_div.appendChild(date_el);

        const btns_div = document.createElement('div');
        btns_div.classList.add('task-btns');

        const complete_btn = document.createElement('button');
        complete_btn.classList.add('toggle');
        complete_btn.textContent = 'Complete';

        const edit_btn = document.createElement('button');
        edit_btn.classList.add('edit');
        edit_btn.textContent = 'Edit';

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.textContent = 'Delete';

        btns_div.appendChild(complete_btn);
        btns_div.appendChild(edit_btn);
        btns_div.appendChild(delete_btn);

        task_div.appendChild(content_div);
        task_div.appendChild(btns_div);

        taskList.appendChild(task_div);

        inputTask.value = "";
        inputDate.value = "";
    });

    taskList.addEventListener('click', function(e) {
        if(e.target.classList[0] === 'delete') {
            const taskEl = e.target.parentElement.closest('.task');
            taskList.removeChild(taskEl);
        } else if(e.target.classList[0] === 'toggle') {
            const taskEl = e.target.parentElement.closest('.task');
            const taskInputs = taskEl.querySelectorAll('input');
            taskInputs.forEach(taskInput => {
                taskInput.classList.toggle('completed');
            });
            
            e.target.style.display = 'none';
            const edit_btn = taskEl.querySelector('.edit');
            edit_btn.style.display = 'none';
        } else if(e.target.classList[0] === 'edit') {
            const taskEl = e.target.parentElement.closest('.task');
            const taskInputs = taskEl.querySelectorAll('input');
            taskInputs.forEach((taskInput, index) => {
                taskInput.removeAttribute('readonly');
                taskInput.classList.add('editable');

                if(index === 0) taskInput.focus();
                if(index === 1) taskInput.type = 'date';
            });

            e.target.textContent = 'Save';
            e.target.classList.remove('edit');
            e.target.classList.add('save');
        } else if(e.target.classList[0] === 'save') {
            const taskEl = e.target.parentElement.closest('.task');
            const taskInputs = taskEl.querySelectorAll('input');
            taskInputs.forEach((taskInput, index) => {
                taskInput.setAttribute('readonly', 'readonly');
                taskInput.classList.remove('editable');
                if(index === 1) taskInput.type = 'text';
            })
            e.target.textContent = 'Edit';
            e.target.classList.remove('save');
            e.target.classList.add('edit');
        }
    });
});