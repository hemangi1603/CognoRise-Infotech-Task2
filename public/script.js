document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    let tasks = [];
    let editingTaskId = null;

    const updateTaskCount = () => {
        const incompleteTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = `You have ${incompleteTasks} tasks to complete`;
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.toggle('completed', task.completed);

            const taskDetails = document.createElement('div');
            taskDetails.classList.add('task-details');

            const taskTitle = document.createElement('span');
            taskTitle.classList.add('task-title');
            taskTitle.textContent = task.title;
            taskDetails.appendChild(taskTitle);

            const completeCheckbox = document.createElement('input');
            completeCheckbox.type = 'checkbox';
            completeCheckbox.classList.add('complete-checkbox');
            completeCheckbox.checked = task.completed;
            completeCheckbox.addEventListener('change', () => {
                task.completed = completeCheckbox.checked;
                renderTasks();
                updateTaskCount();
            });

            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.innerHTML = '&#9998;'; 
            editButton.addEventListener('click', () => {
                editingTaskId = task.id;
                taskTitleInput.value = task.title;
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.innerHTML = '&#10006;'; 
            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks();
                updateTaskCount();
            });

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('task-buttons');
            taskButtons.appendChild(editButton);
            taskButtons.appendChild(deleteButton);

            taskItem.appendChild(completeCheckbox);
            taskItem.appendChild(taskDetails);
            taskItem.appendChild(taskButtons);

            taskList.appendChild(taskItem);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();

        if (title) {
            if (editingTaskId) {
                const task = tasks.find(t => t.id === editingTaskId);
                task.title = title;
                editingTaskId = null;
            } else {
                const newTask = {
                    id: Date.now().toString(),
                    title,
                    completed: false
                };
                tasks.push(newTask);
            }

            taskTitleInput.value = '';
            renderTasks();
            updateTaskCount();
        }
    });

    updateTaskCount();
});
