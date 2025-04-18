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

        const check_box = document.createElement('input');
        check_box.type = 'checkbox';

        const main_div = document.createElement('div');
        main_div.classList.add('main');

        const content_div = document.createElement('div');
        content_div.classList.add('content');

        const task_el = document.createElement('input');
        task_el.type = 'text';
        task_el.value = task;
        task_el.setAttribute('readonly', 'readonly');
        task_el.setAttribute('required', 'required');
        task_el.classList.add('task');

        const date_el = document.createElement('input');
        date_el.type = 'text';
        date_el.value = date;
        date_el.setAttribute('readonly', 'readonly');
        date_el.setAttribute('required', 'required');
        date_el.classList.add('date');

        content_div.appendChild(task_el);
        content_div.appendChild(date_el);

        const btns_div = document.createElement('div');
        btns_div.classList.add('task-btns');

        const edit_btn = document.createElement('button');
        edit_btn.classList.add('edit');
        edit_btn.textContent = 'Edit';

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.textContent = 'Delete';

        btns_div.appendChild(edit_btn);
        btns_div.appendChild(delete_btn);

        main_div.appendChild(content_div);
        main_div.appendChild(btns_div);

        task_div.appendChild(check_box);
        task_div.appendChild(main_div);

        taskList.appendChild(task_div);

        inputTask.value = "";
        inputDate.value = "";
    });
});