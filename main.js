const todoList = document.getElementById('todo-list');
const searchInput = document.getElementById('search');
const newNoteInput = document.getElementById('new-note');
const addBtn = document.getElementById('add-btn');
const modeToggle = document.getElementById('mode-toggle');

let todos = [
  { text: "NOTE #1", completed: false },
  { text: "NOTE #2", completed: true },
  { text: "NOTE #3", completed: false },
];

// Тема
function toggleTheme() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  modeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
}

// Инициализация
if (!document.body.classList.contains('light')) {
  document.body.classList.add('dark');
}
renderList();

// Рендер списка
function renderList() {
  todoList.innerHTML = '';
  const filter = searchInput.value.toLowerCase();
  todos
    .filter(todo => todo.text.toLowerCase().includes(filter))
    .forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');
      li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
        <span>${todo.text}</span>
        <i onclick="editNote(${index})">✏️</i>
        <i onclick="deleteNote(${index})">🗑️</i>
      `;
      todoList.appendChild(li);
    });
}

// Управление задачами
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderList();
}

function deleteNote(index) {
  todos.splice(index, 1);
  renderList();
}

function editNote(index) {
  const newText = prompt("Edit note:", todos[index].text);
  if (newText !== null && newText.trim() !== '') {
    todos[index].text = newText;
    renderList();
  }
}

function addNote() {
  const text = newNoteInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    newNoteInput.value = '';
    renderList();
  }
}

function focusInput() {
  newNoteInput.focus();
}

addBtn.addEventListener('click', addNote);
searchInput.addEventListener('input', renderList);
modeToggle.addEventListener('click', toggleTheme);
newNoteInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addNote();
});
