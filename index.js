class TodoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const localStorage = [
  new TodoItem('test1', 'test1 description: lorem', Date.now(), 'low'),
  new TodoItem('test2', 'test2 description: ipsum', Date.now(), 'medium'),
];

document.querySelector('#addTask').addEventListener('click', () => {
  const title = document.querySelector(`input[name="title"]`);
  const description = document.querySelector(`input[name="description"]`);
  const dueDate = document.querySelector(`input[name="dueDate"`);
  const priority = document.querySelector(`select[name="priority"]`);

  if (title.value && description.value && dueDate.value) {
    const todo = new TodoItem(
      title.value, description.value, dueDate.valueAsDate, priority.value
    );
    localStorage.push(todo);
  
    title.value = '';
    description.value = '';
    dueDate.value = null;
    priority.value = 'low';
  } else {
    alert("Please fill out all fields.");
  }
  
});