const addListBtn = document.getElementById('addListBtn');
const listNameInput = document.getElementById('listName');
const listsContainer = document.getElementById('listsContainer');

addListBtn.addEventListener('click', () => {
  const name = listNameInput.value.trim();
  if (!name) return;
  createList(name);
  listNameInput.value = '';
});

function createList(name) {
  const listDiv = document.createElement('div');
  listDiv.className = 'list';

  const header = document.createElement('div');
  header.className = 'list-header';
  header.innerHTML = `<h2>${name}</h2>`;
  listDiv.appendChild(header);

  // New task form
  const newTaskDiv = document.createElement('div');
  newTaskDiv.className = 'new-task';
  newTaskDiv.innerHTML = `
    <input type="text" placeholder="Task description">
    <input type="datetime-local">
    <button>Add Task</button>
  `;
  listDiv.appendChild(newTaskDiv);

  const taskUl = document.createElement('ul');
  listDiv.appendChild(taskUl);

  const addTaskBtn = newTaskDiv.querySelector('button');
  const taskInput = newTaskDiv.querySelector('input[type="text"]');
  const dateInput = newTaskDiv.querySelector('input[type="datetime-local"]');

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const due = dateInput.value;
    if (!taskText) return;
    createTask(taskUl, taskText, due);
    taskInput.value = '';
    dateInput.value = '';
  });

  listsContainer.appendChild(listDiv);
}

function createTask(container, text, due) {
  const li = document.createElement('li');
  li.className = 'task';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'name';
  nameSpan.textContent = text;

  const dueSmall = document.createElement('small');
  dueSmall.className = 'due';
  if (due) {
    const d = new Date(due);
    dueSmall.textContent = '(Due: ' + d.toLocaleString() + ')';
  }

  const actions = document.createElement('div');
  actions.className = 'actions';

  // Done
  const doneBtn = document.createElement('button');
  doneBtn.className = 'done';
  doneBtn.textContent = '✓';
  doneBtn.addEventListener('click', () => li.classList.toggle('completed'));

  // Edit
  const editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editTask(nameSpan, dueSmall));

  // Delete
  const delBtn = document.createElement('button');
  delBtn.className = 'delete';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => li.remove());

  actions.append(doneBtn, editBtn, delBtn);
  li.append(nameSpan, dueSmall, actions);
  container.appendChild(li);
}

function editTask(nameSpan, dueSmall) {
  const newText = prompt('Edit task text:', nameSpan.textContent);
  if (newText !== null && newText.trim() !== '') {
    nameSpan.textContent = newText.trim();
  }
  const newDue = prompt('Edit due date/time (YYYY-MM-DD HH:MM):', '');
  if (newDue) {
    const d = new Date(newDue);
    if (!isNaN(d)) {
      dueSmall.textContent = '(Due: ' + d.toLocaleString() + ')';
    }
  }
}
