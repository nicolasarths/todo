import TodoList from "src/entities/TodoList";
import TodoItem from "src/entities/TodoItem";

export const todoListName = "A Todo List for Testing Purposes";
export const todoList: TodoList = new TodoList(todoListName);

export const anotherTodoListName = "Another Todo List Name";
export const anotherTodoList: TodoList = new TodoList(anotherTodoListName);

export const todoItemName = "Todo Item for testing purposes";
export const todoItem: TodoItem = new TodoItem(todoItemName, todoList.getId());
