let taskInput = document.getElementById('task-input');
let addTaskBtn = document.getElementById('add-task-btn');
let taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.name}
            <button data-index="${index}" class="delete-task-btn">X</button>
        `;
        li.addEventListener('click', () => toggleTaskCompletion(index));
        taskList.appendChild(li);
    });
}

export function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = ''; 
        saveTasks();
        renderTasks();
    }
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function initializeTaskListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteTask(index);
        }
    });
}
