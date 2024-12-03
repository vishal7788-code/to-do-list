let todo = [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todo));
}

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todo = JSON.parse(storedTodos);
    }
    render();
}

function addTodo() {
    const input = document.querySelector("input");
    const title = input.value;
    if (title.trim() === "") {
        alert("Please enter text");
        return;
    } else {
        todo.push({
            title: title,
            isCompleted: false
        });
        render();
        saveTodos();
        input.value = "";
    }
}

function todoComponent(todoItem) {
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    ul.innerHTML = todoItem.title;
    div.classList.add("flex", "items-center", "justify-between", "p-2", "bg-slate-600", "rounded-lg", "mt-2", "text-sm", "md:text-base", "lg:text-lg");
    div.append(ul);

    const input = document.createElement("input");
    input.style.display = "none";
    input.value = todoItem.title;
    input.classList.add(
        "w-full",
        "rounded-lg",
        "outline-none",
        "text-black",
        "p-2",
        "text-sm",
        "sm:p-3",
        "sm:text-base",
        "md:p-4",
        "md:text-lg"
    );
    div.append(input);

    const divSec = document.createElement("div");
    divSec.classList.add("flex", "items-center", "space-x-2");
    div.append(divSec);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add(
        "bg-teal-400",
        "text-white",
        "rounded-lg",
        "px-3",
        "py-2",
        "text-sm",
        "sm:px-4",
        "sm:py-3",
        "sm:text-base",
        "md:px-5",
        "md:py-3",
        "lg:text-lg",
        "hover:bg-teal-500"
    );
    divSec.append(editBtn);

    editBtn.addEventListener("click", () => {
        ul.style.display = "none";
        input.style.display = "block";
        editBtn.style.display = "none";
        saveBtn.style.display = "block";
    });

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.style.display = "none";
    saveBtn.classList.add(
        "bg-teal-400",
        "text-white",
        "rounded-lg",
        "px-3",
        "py-2",
        "text-sm",
        "sm:px-4",
        "sm:py-3",
        "sm:text-base",
        "md:px-5",
        "md:py-3",
        "lg:text-lg",
        "hover:bg-teal-500"
    );
    divSec.append(saveBtn);

    saveBtn.addEventListener("click", () => {
        todoItem.title = input.value.trim();
        ul.innerHTML = todoItem.title;
        saveBtn.style.display = "none";
        input.style.display = "none";
        editBtn.style.display = "block";
        ul.style.display = "block";
        render();
        saveTodos();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add(
        "bg-red-500",
        "text-white",
        "rounded-lg",
        "px-3",
        "py-2",
        "text-sm",
        "sm:px-4",
        "sm:py-3",
        "sm:text-base",
        "md:px-5",
        "md:py-3",
        "lg:text-lg",
        "hover:bg-red-600"
    );
    divSec.append(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        const index = todo.indexOf(todoItem);
        if (index > -1) {
            todo.splice(index, 1);
            render();
            saveTodos();
        }
    });

    return div;
}


function render() {
    const todoList = document.querySelector("#todo-item");
    todoList.innerHTML = "";

    todo.forEach(todoItem => {
        const todoElement = todoComponent(todoItem);

        const ul = todoElement.querySelector("ul");
        const editBtn = todoElement.querySelector("button:nth-child(1)");

        if (todoItem.isCompleted) {
            ul.classList.add("line-through", "text-gray-300", "pointer");
            editBtn.style.display = "none";
        } else {
            ul.classList.remove("line-through", "text-gray-300");
             editBtn.style.display = "block";
        }

        ul.addEventListener("click", function () {
            todoItem.isCompleted = !todoItem.isCompleted;
            render();
            saveTodos();
        });

        todoList.append(todoElement);
    });
}


loadTodos();
