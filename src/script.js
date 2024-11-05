const taskInput = document.getElementById("new-task");
const taskPriority = document.getElementById("task-priority");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let editingTask = null; // Variável para rastrear a tarefa que está sendo editada

// Adiciona uma nova tarefa ao DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");
    
    // Adiciona a classe correspondente à prioridade
    taskItem.classList.add(task.priority);
    taskItem.setAttribute("data-priority", task.priority);
    
    taskItem.innerHTML = `
        <span class="task-name">${task.name}</span>
        <span class="task-details">${new Date(task.date).toLocaleString()}</span>
        <button class="remove-btn">Remover</button>
        <button class="edit-btn">Editar</button>
        <button class="complete-btn">Completar</button>
    `;

    const removeBtn = taskItem.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        tasks = tasks.filter(t => t.name !== task.name); // Remove a tarefa da lista
        saveTasks();
    });

    const editBtn = taskItem.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        taskInput.value = task.name; // Preenche o campo de entrada com o nome da tarefa
        taskPriority.value = task.priority; // Preenche o seletor de prioridade
        editingTask = task; // Define a tarefa atual como a tarefa que está sendo editada
    });

    const completeBtn = taskItem.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => {
        taskItem.classList.toggle("completed"); // Adiciona ou remove a classe 'completed'
        task.completed = !task.completed; // Atualiza o status da tarefa
        saveTasks(); // Salva o estado atualizado
    });

    taskList.appendChild(taskItem);
}

// Salva tarefas no armazenamento local
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carrega tarefas do armazenamento local
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(addTaskToDOM);
    }
}

// Aplica filtros nas tarefas
function applyFilter(filter) {
    const taskItems = document.querySelectorAll(".task");

    taskItems.forEach(task => {
        task.style.display = "flex"; // Reset de display padrão
        const taskCompleted = task.classList.contains("completed"); // Verifica se a tarefa está completa
        const taskPriority = task.getAttribute("data-priority"); // Pega a prioridade da tarefa

        // Filtro por prioridade e estado
        if (filter === "all") {
            task.style.display = "flex";
        } else if (filter === "completed") {
            task.style.display = taskCompleted ? "flex" : "none";
        } else if (filter === "pending") {
            task.style.display = !taskCompleted ? "flex" : "none";
        } else if (filter === "normal" || filter === "urgent" || filter === "non-urgent") {
            task.style.display = taskPriority === filter ? "flex" : "none";
        }
    });
}

// Adiciona evento de clique ao botão de adicionar tarefa
addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    const priority = taskPriority.value; // A prioridade selecionada
    const date = new Date();

    if (taskName !== "") {
        const newTask = { name: taskName, priority, date };
        tasks.push(newTask);
        addTaskToDOM(newTask);
        saveTasks();
        taskInput.value = ""; // Limpa o campo de entrada
    }
});


// Adiciona eventos de clique aos botões de filtro
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active")); // Remove a classe 'active' de todos
        button.classList.add("active"); // Adiciona a classe 'active' ao botão clicado
        applyFilter(button.getAttribute("data-filter")); // Aplica o filtro
    });
});

// Carrega as tarefas ao iniciar
loadTasks();
