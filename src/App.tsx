import React from 'react';
import './App.css';
import { TasksPropsType, TodoList } from './TodoList';

function App() {
    const tasks1: Array<TasksPropsType> = [
        { id: 1, text: "HTML&CSS", isDone: true },
        { id: 2, text: "JS", isDone: true },
        { id: 3, text: "React", isDone: false },
        { id: 4, text: "Redux", isDone: false },
    ]
    const tasks2: Array<TasksPropsType> = [
        { id: 1, text: "Dubstep", isDone: true },
        { id: 2, text: "Rock", isDone: true },
        { id: 3, text: "Pop", isDone: false },
        { id: 4, text: "Rap", isDone: false },
    ]

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks1} />
            <TodoList title={"What to listen"} tasks={tasks2} />
        </div>
    );
}

export default App;
