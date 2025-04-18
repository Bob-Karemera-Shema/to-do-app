const inputForm = document.querySelector('#input-form');
const taskList = document.querySelector('.task-list');
const inputTitle = document.querySelector('#input-title');
const inputDate = document.querySelector('#input-date');

inputForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = inputTitle.value;
    const date = inputDate.value;

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task">
            <input type="checkbox" class="checkbox" />
            <div class="details">
                <span class="title">${title}</span>
                <span class="date">${date}</span>
            </div>
        </div>
        <div class="task-btns">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', function(e) {
        inputTitle.value = title;
        inputDate.value = date;
        li.remove();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function(e) {
        li.remove();
    })

    taskList.appendChild(li);
    inputTitle.value = "";
    inputDate.value = "";
})