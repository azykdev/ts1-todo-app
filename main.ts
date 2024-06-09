// Interface
interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

const deleteAll = document.querySelector('.delete-all') as HTMLButtonElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoInput = document.querySelector('.todo-input') as HTMLInputElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;

let allTodos: ITodo[] = JSON.parse(localStorage.getItem('todos') || '[]');

// Functions
const writeTodos = (todos: ITodo[]): void => {
  localStorage.setItem('todos', JSON.stringify(todos));
  todoList.innerHTML = '';

  todos.forEach((todo: ITodo): void => {
    const newTodo = document.createElement('li');
    newTodo.className = 'todo-item';

    newTodo.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-todo">Delete</button>
    `;

    newTodo.querySelector('.delete-todo')?.addEventListener('click', () => {
      allTodos = allTodos.filter(t => t.id !== todo.id);
      writeTodos(allTodos);
    });

    newTodo.querySelector('.todo-checkbox')?.addEventListener('change', (e: Event) => {
      todo.completed = (e.target as HTMLInputElement).checked;
      writeTodos(allTodos);
    });

    todoList.appendChild(newTodo);
  });
}

// Events
window.addEventListener('DOMContentLoaded', (): void => {
  writeTodos(allTodos);
});

todoForm.addEventListener('submit', (e: Event): void => {
  e.preventDefault();

  const newTodo: ITodo = {
    id: Date.now(),
    text: todoInput.value,
    completed: false
  };

  allTodos.push(newTodo);

  writeTodos(allTodos);

  todoInput.value = '';
});

deleteAll.addEventListener('click', (): void => {

  allTodos.length = 0;

  writeTodos(allTodos);
});