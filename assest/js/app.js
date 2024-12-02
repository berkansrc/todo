const todoFormEl = document.querySelector("#todo-form");
const taskInputEl = document.querySelector("#task-name");
const dueDateInputEl = document.querySelector("#due-date");
const tableBodyEl = document.querySelector("#todo-table-body");
const searchInputEl = document.querySelector("#search-input");
const updateModalEl = document.querySelector("#update-modal");
const closeModalEl = document.querySelector("#close-update-modal");
const updateFormEl = document.querySelector("#update-form");
const updateTaskNameEl = document.querySelector("#update-task-name");
const updateDueDateEl = document.querySelector("#update-due-date");

let todoList = JSON.parse(localStorage.getItem('todos')) || [];

todoFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const newTodo = {
        task: taskInputEl.value,
        dueDate: dueDateInputEl.value,
        completed: false,
    };

    todoList.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todoList));
    showAlert("Yeni Todo Eklendi", "success")
    renderTodoList(todoList);
    taskInputEl.value = "";
    dueDateInputEl.value = "";
});


function renderTodoList(todos) {
    tableBodyEl.innerHTML = "";
    todos.forEach((item, index) => {
        const row = document.createElement("tr");
        row.setAttribute("index", index);
        row.classList.toggle("completed", item.completed);
        row.innerHTML = `
            <td>${item.task}</td>
            <td>${item.dueDate}</td>
            <td><input type="checkbox" onchange="toggleCompleted(${index}, event)" ${item.completed ? 'checked' : ''}></td>
            <td>
                <button class="update-btn" onclick="openUpdateModal(${index})">Güncelle</button>
                <button class="delete-btn" onclick="removeTodo(${index})">Sil</button>
            </td>
        `;
        tableBodyEl.appendChild(row);
    });
}

function toggleCompleted(index, e) {
    todoList[index].completed = e.target.checked;
    localStorage.setItem('todos', JSON.stringify(todoList));
    renderTodoList(todoList);
}

function openUpdateModal(index) {
    const todoToUpdate = todoList[index];
    updateTaskNameEl.value = todoToUpdate.task;
    updateDueDateEl.value = todoToUpdate.dueDate;
    updateFormEl.onsubmit = function (e) {
        e.preventDefault();
        updateTodo(index);
    };
    updateModalEl.style.display = "block";
}

function closeUpdateModal() {
    updateModalEl.style.display = "none";
}

function showAlert(message, type) {
    const alertEl = document.getElementById('alert-message');
    alertEl.textContent = message;
    alertEl.className = `alert ${type}`;
    alertEl.style.display = 'block';
    setTimeout(() => {
        alertEl.style.display = 'none';
    }, 3000);
}

closeModalEl.addEventListener('click', closeUpdateModal);

function updateTodo(index) {
    todoList[index].task = updateTaskNameEl.value;
    todoList[index].dueDate = updateDueDateEl.value;
    localStorage.setItem('todos', JSON.stringify(todoList));
    renderTodoList(todoList);
    closeUpdateModal();
}

function removeTodo(index) {
    todoList.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todoList));
    renderTodoList(todoList);
}

searchInputEl.addEventListener("input", function (e) {
    const searchValue = e.target.value.toLowerCase();
    const filteredTodoList = todoList.filter(item =>
        item.task.toLowerCase().includes(searchValue)
    );
    renderTodoList(filteredTodoList);
});

renderTodoList(todoList);
