// Seleção de elementos
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Função para adicionar tarefas
function addTask() {
    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = taskInput.value;

        // Adiciona botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.className = 'remove-btn';
        newTask.appendChild(removeBtn);

        // Adiciona evento ao botão de remover
        removeBtn.addEventListener('click', () => {
            newTask.remove(); // Remove a tarefa do DOM
            saveTasks();      // Atualiza o LocalStorage
        });

        taskList.appendChild(newTask);
        taskInput.value = ''; // Limpa o campo de entrada
        saveTasks();          // Salva a nova lista no LocalStorage
    }
}

// Evento de clique para adicionar tarefas
addTaskBtn.addEventListener('click', addTask);

// Função para salvar tarefas no LocalStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => task.textContent.replace('Remover', '').trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar tarefas ao abrir a página
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(taskText => {
        const task = document.createElement('li');
        task.textContent = taskText;

        // Adiciona botão de remover para tarefas carregadas
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.className = 'remove-btn';
        task.appendChild(removeBtn);

        // Adiciona evento ao botão de remover
        removeBtn.addEventListener('click', () => {
            task.remove();
            saveTasks();
        });

        taskList.appendChild(task);
    });
};
