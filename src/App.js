import React, { useState }  from "react"; 
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
};

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  
  const [todos, setTodos] = React.useState([
    { 
      text: "Learn about React",
      isCompleted: false 
    },
    { 
      text: "Meet friend for lunch",
      isCompleted: false 
    },
    { 
      text: "Build really cool todo app",
      isCompleted: false 
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <DragDropContext 
      onDragEnd={(param)=>{
        const srcI = param.source.index;
        const desI = param.destination.index;
        const newTodos = [...todos];
        newTodos.splice(desI, 0, newTodos.splice(srcI, 1)[0]);
        setTodos(newTodos);
      }}>
      <TodoForm addTodo={addTodo} />
        <Droppable droppableId="droppable-1">
          {(provided) => (
          <div className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
            <Draggable key={index} draggableId={'draggable-' + index} index={index}>
            {(provided) => (
            <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
            </div>
            )}
            </Draggable>
            ))}
            {provided.placeholder}
          </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
