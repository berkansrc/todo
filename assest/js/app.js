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
    console.log(todoList);
    taskInputEl.value = "";
    dueDateInputEl.value = "";
});

function renderTodoList(todos) {
    tableBodyEl.innerHTML = "";

    todos.forEach((item, index) => {
        const row = document.createElement("tr");
        row.setAttribute("index", index)
        row.innerHTML = `
            <td>${item.task}</td>
            <td>${item.dueDate}</td> 
            <td><input type="checkbox" onchange="completedTodo(event)"></td>
            <td>
                <button class="update-btn">Güncelle</button>
                <button class="delete-btn" onclick="removeTodo(event)">Sil</button>
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


function completedTodo(e) {
    const targetTodo = e.target
    targetTodo.parentElement.parentElement.classList.toggle("completed");
}


function removeTodo(e) {
    const targetRowEl = e.target.parentElement.parentElement;
    const targetIndex = targetRowEl.getAttribute("index")
    todoList.splice(targetIndex, 1)
    renderTodoList(todoList)
}