const todoFormEl = document.querySelector("#todo-form");
const taskInputEl = document.querySelector("#task-name");
const dueDateInputEl = document.querySelector("#due-date");
const tableBodyEl = document.querySelector("#todo-table-body")
const searchInputEl = document.querySelector("#search-input")
let todoList = [], todoObj = {}

todoFormEl.addEventListener("submit", function (e) {
    todoObj.task = taskInputEl.value
    todoObj.dueDate = dueDateInputEl.value
    todoList.push(todoObj)
    console.log(todoList);
    renderTodoList(todoList)
    todoObj = {}
})

function renderTodoList(todos) {
    tableBodyEl.innerHTML = ""
    todos.map((item) => {
        tableBodyEl.innerHTML += `
        <tr>
            <td>${item.task}</td>
            <td>${item.dueDate}</td>
            <td><input type="checkbox"></td>
            <td>
                <button class="update-btn">Güncelle</button>
                <button class="delete-btn">Sil</button>
            </td>
        </tr>
    `
    })
}
let filteredTodoList = []
searchInputEl.addEventListener("input", function (e) {
    const searchValue = e.target.value;
    todoList.map((item) => {
        let itemTask = item.task.toLowerCase();
        if (itemTask.includes(searchValue.toLowerCase())) {
            filteredTodoList.push(item)

        }
    }) 
    renderTodoList(filteredTodoList)
    filteredTodoList = []
})