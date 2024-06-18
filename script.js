document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const saveBtn = document.getElementById('save-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    loadTodos();

    addBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        todoInput.focus();
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        todoInput.value = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            todoInput.value = '';
        }
    });

    saveBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTodos();
            todoInput.value = '';
            modal.style.display = 'none';
        }
    });

    function addTask(taskText, completed = false) {
        const li = document.createElement('li');
        li.textContent = taskText;

        if (completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTodos();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.textContent.slice(0, -1), // Remove the delete button text
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTask(todo.text, todo.completed));
    }
});
