class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const main = document.querySelector('main');
const localStorage = [
  new Task('buy some shoes', `let's go to the mall you guys`, new Date(), 'low'),
  new Task('plant a carrot', 'solve world hunger', new Date(), 'medium'),
];

function buildTaskList() {
  // New Task button
  main.innerHTML = /*html*/`
    <button type="button" id="createNewTask">New Task</button>
  `;
  const newTaskButton = main.querySelector('#createNewTask');
  newTaskButton.addEventListener('click', buildNewTaskForm);

  // Create each task item in UI
  localStorage.forEach(task => {
    const newElement = document.createElement('div');
    newElement.innerHTML = /*html*/`
      <p>${task.title}</p>
      <button type="button" class="editTask">✏</button>
      <button type="button" class="cancelTask">X</button>
    `;

    // Edit button
    const editTask = newElement.querySelector('button.editTask');
    editTask.addEventListener('click', buildEditTaskForm.bind(null, task));
    newElement.classList.add('taskItem');
    main.appendChild(newElement);

    // Delete button
    const deleteTask = newElement.querySelector('button.cancelTask');
    deleteTask.addEventListener('click', () => {
      const taskIndex = localStorage.findIndex(item => item === task);
      localStorage.splice(taskIndex, 1);
      buildTaskList();
    });
  });
}

function buildEditTaskForm(task) {
  // Format task date for HTML
  const taskYear = task.dueDate.getUTCFullYear().toString();
  const taskMonth = (task.dueDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const taskDay = task.dueDate.getUTCDate().toString().padStart(2, '0');
  const taskDate = `${taskYear}-${taskMonth}-${taskDay}`;
  
  // Build edit form
  main.innerHTML = /*html*/`
    <form id="editTaskForm">
      <label for="title">Title:</label><br>
      <input type="text" name="title" value="${task.title}"><br>

      <label for="description">Description:</label><br>
      <input type="text" name="description" value="${task.description}"><br>

      <label for="dueDate">Due Date:</label><br>
      <input type="date" name="dueDate" value="${taskDate}"><br>

      <label for="priority">Priority:</label><br>
      <select name="priority">
        <option value="high" 
          ${task.priority === 'high' ? 'selected' : ''}>High</option>
        <option value="medium" 
          ${task.priority  === 'medium' ? 'selected' : ''}>Medium</option>
        <option value="low" 
          ${task.priority === 'low' ? 'selected' : ''}>Low</option>
      </select><br><br>

      <button type="button" id="saveTask">Save</button>
      <button type="button" id="cancelEditTask">Cancel</button>
    </form>
  `;

  // Save button
  const saveTask = main.querySelector('#saveTask');
  saveTask.addEventListener('click', () => {
    const newTitle = main.querySelector('input[name="title"]').value;
    const newDesc = main.querySelector('input[name="description"]').value;
    const newDueDate = main.querySelector('input[name="dueDate"]').valueAsDate;
    const newPriority = main.querySelector('select[name="priority"]').value;
    if (newTitle && newDesc && newDueDate && newPriority) {
      task.title = newTitle;
      task.description = newDesc;
      task.dueDate = newDueDate;
      task.priority = newPriority;
      buildTaskList();
    } else {
      alert("Please fill out all fields");
    }
  });

  // Cancel button
  const cancelEditTask = main.querySelector('#cancelEditTask');
  cancelEditTask.addEventListener('click', buildTaskList);
}

function buildNewTaskForm() {
  // Form
  main.innerHTML = /*html*/`
    <form id="newTaskForm">
      <label for="title">Title:</label><br>
      <input type="text" name="title"><br>

      <label for="description">Description:</label><br>
      <input type="text" name="description"><br>

      <label for="dueDate">Due Date:</label><br>
      <input type="date" name="dueDate"><br>

      <label for="priority">Priority:</label><br>
      <select name="priority">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low" selected>Low</option>
      </select><br><br>

      <button type="button" id="addTask">Save</button>
      <button type="button" id="cancelNewTask">Cancel</button>
    </form>
  `;

  // Save button
  const saveTask = main.querySelector('#addTask');
  saveTask.addEventListener('click', () => {
    const title = main.querySelector('input[name="title"]').value;
    const desc = main.querySelector('input[name="description"]').value;
    const dueDate = main.querySelector('input[name="dueDate"]').valueAsDate;
    const priority = main.querySelector('select[name="priority"]').value;
    if (title && desc && dueDate && priority) {
      newTask = new Task(title, desc, dueDate, priority);
      localStorage.push(newTask);
      buildTaskList();
    } else {
      alert("Please fill out all fields");
    }
  });

  // Cancel button
  const cancelNewTask = main.querySelector('#cancelNewTask');
  cancelNewTask.addEventListener('click', buildTaskList);
}


buildTaskList();

