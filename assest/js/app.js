const todoFormEl = document.querySelector("#todo-form");
const taskInputEl = document.querySelector("#task-name");
const dueDateInputEl = document.querySelector("#due-date");
const tableBodyEl = document.querySelector("#todo-table-body");
const searchInputEl = document.querySelector("#search-input");

let todoList = [];

todoFormEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const newTodo = {
        task: taskInputEl.value,
        dueDate: dueDateInputEl.value,
    };

    todoList.push(newTodo);
    renderTodoList(todoList);

    taskInputEl.value = "";
    dueDateInputEl.value = "";
});

function renderTodoList(todos) {
    tableBodyEl.innerHTML = "";

    todos.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.task}</td>
            <td>${item.dueDate}</td>
            <td><input type="checkbox"></td>
            <td>
                <button class="update-btn">Güncelle</button>
                <button class="delete-btn">Sil</button>
            </td>
        `;
        tableBodyEl.appendChild(row);
    });
}

searchInputEl.addEventListener("input", function (e) {
    const searchValue = e.target.value.toLowerCase();

    const filteredTodoList = todoList.filter(item =>
        item.task.toLowerCase().includes(searchValue)
    );

    renderTodoList(filteredTodoList);
});
