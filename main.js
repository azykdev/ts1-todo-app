"use strict";
const deleteAll = document.querySelector('.delete-all');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
let allTodos = JSON.parse(localStorage.getItem('todos') || '[]');
// Functions
const writeTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        var _a, _b;
        const newTodo = document.createElement('li');
        newTodo.className = 'todo-item';
        newTodo.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
      <span class="todo-text">${todo.text}</span>
      <button class="delete-todo">Delete</button>
    `;
        (_a = newTodo.querySelector('.delete-todo')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            allTodos = allTodos.filter(t => t.id !== todo.id);
            writeTodos(allTodos);
        });
        (_b = newTodo.querySelector('.todo-checkbox')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (e) => {
            todo.completed = e.target.checked;
            writeTodos(allTodos);
        });
        todoList.appendChild(newTodo);
    });
};
// Events
window.addEventListener('DOMContentLoaded', () => {
    writeTodos(allTodos);
});
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
        text: todoInput.value,
        completed: false
    };
    allTodos.push(newTodo);
    writeTodos(allTodos);
    todoInput.value = '';
});
deleteAll.addEventListener('click', () => {
    allTodos.length = 0;
    writeTodos(allTodos);
});
