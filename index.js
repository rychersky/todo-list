class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// DOM Constants

const createNewTask = document.querySelector('#createNewTask');
const newTaskForm = document.querySelector('#newTaskForm');
const title = document.querySelector(`input[name="title"]`);
const description = document.querySelector(`input[name="description"]`);
const dueDate = document.querySelector(`input[name="dueDate"`);
const priority = document.querySelector(`select[name="priority"]`);
const addTask = document.querySelector('#addTask');
const cancelNewTask = document.querySelector('#cancelNewTask');
const taskList = document.querySelector('#taskList');
const editTaskForm = document.querySelector('#editTaskForm');

const localStorage = [
  new Task('buy some shoes', `let's go to the mall you guys`, Date.now(), 'low'),
  new Task('plant a carrot', 'solve world hunger', Date.now(), 'medium'),
];

// Functions

function buildTaskList() {
  taskList.innerHTML = '';
  localStorage.forEach(task => {
    const newElement = document.createElement('div');
    newElement.innerHTML = /*html*/`
      <p>${task.title}</p>
      <button type="button" class="editTaskItem">✏</button>
      <button type="button" class="cancelTask">X</button>
    `;
    const editTaskButton = newElement.querySelector('button.editTaskItem');
    editTaskButton.addEventListener('click', buildEditTaskForm.bind(null, task));
    newElement.classList.add('taskItem');
    taskList.appendChild(newElement);
  });
}

function buildEditTaskForm(task) {
  taskList.classList.add('hidden');
  createNewTask.classList.add('hidden');
  editTaskForm.classList.remove('hidden');
  editTaskForm.innerHTML = /*html*/`
    <label for="title">Title:</label><br>
    <input type="text" name="title" value="${task.title}"><br>

    <label for="description">Description:</label><br>
    <input type="text" name="description" value="${task.description}"><br>

    <label for="dueDate">Due Date:</label><br>
    <input type="date" name="dueDate"><br>

    <label for="priority">Priority:</label><br>
    <select name="priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low" selected>Low</option>
    </select><br><br>

    <button type="button" id="saveTask">Save</button>
    <button type="button" id="cancelEditTask">Cancel</button>
  `;
  const saveTask = editTaskForm.querySelector('#saveTask');
  saveTask.addEventListener('click', () => {
    
  });
}


function exitForm() {
  createNewTask.classList.remove('hidden');
  newTaskForm.classList.add('hidden');
  taskList.classList.remove('hidden');
  resetFormFields();
}

function resetFormFields() {
  title.value = '';
  description.value = '';
  dueDate.value = null;
  priority.value = 'low';
}

buildTaskList();

// Event Listeners

createNewTask.addEventListener('click', () => {
  createNewTask.classList.add('hidden');
  newTaskForm.classList.remove('hidden');
  taskList.classList.add('hidden');
});

addTask.addEventListener('click', () => {
  if (title.value && description.value && dueDate.value) {
    const task = new Task(
      title.value, description.value, dueDate.valueAsDate, priority.value
    );
    localStorage.push(task);
    buildtaskList();
    exitForm();
  } else {
    alert("Please fill out all fields.");
  }
});

cancelNewTask.addEventListener('click', exitForm);