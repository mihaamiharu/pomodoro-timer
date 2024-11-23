let taskInput = document.getElementById('task-input');
let taskPriority = document.getElementById('task-priority'); // New priority dropdown
let addTaskBtn = document.getElementById('add-task-btn');
let taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <div class="task-content">
                <span class="task-name">${task.name}</span>
                <span class="task-priority-tag ${task.priority}">${task.priority}</span>
            </div>
            <div class="task-actions">
                <button data-index="${index}" class="edit-task-btn">Edit</button>
                <button data-index="${index}" class="delete-task-btn">X</button>
            </div>
        `;
        li.addEventListener('click', (e) => {
            if (
                !e.target.classList.contains('edit-task-btn') &&
                !e.target.classList.contains('delete-task-btn')
            ) {
                toggleTaskCompletion(index);
            }
        });
        taskList.appendChild(li);
    });

    attachTaskListeners();
}

export function addTask() {
    const taskName = taskInput.value.trim();
    const priority = taskPriority.value;
    if (taskName) {
        tasks.push({ name: taskName, priority, completed: false });
        taskInput.value = '';
        taskPriority.value = 'low'; 
        saveTasks();
        renderTasks();
    }
}

function editTask(index) {
    const taskItem = taskList.children[index];
    const taskNameElement = taskItem.querySelector('.task-name');
    const editButton = taskItem.querySelector('.edit-task-btn');

    if (taskNameElement.isContentEditable) {
        taskNameElement.contentEditable = false;
        editButton.textContent = 'Edit';
        tasks[index].name = taskNameElement.textContent.trim();
        saveTasks();
        renderTasks();
    } else {
        taskNameElement.contentEditable = true;
        editButton.textContent = 'Save';
        taskNameElement.focus();
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

function attachTaskListeners() {
    const editButtons = document.querySelectorAll('.edit-task-btn');
    const deleteButtons = document.querySelectorAll('.delete-task-btn');

    editButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editTask(index);
        });
    });

    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteTask(index);
        });
    });
}

export function initializeTaskListeners() {
    addTaskBtn.addEventListener('click', addTask);
    renderTasks();
}
