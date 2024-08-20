import React, { useState } from 'react';
import './App.css';
import { TasksPropsType, TodoList } from './TodoList';

export type FilteredTaskType = "all" | "active" | "completed"

function App() {
    /*     const tasks1: Array<TasksPropsType> = [
            { id: 1, text: "HTML&CSS", isDone: true },
            { id: 2, text: "JS", isDone: true },
            { id: 3, text: "React", isDone: false },
            { id: 4, text: "Redux", isDone: false },
        ] */
    // const tasks2: Array<TasksPropsType> = [
    //     { id: 1, text: "Dubstep", isDone: true },
    //     { id: 2, text: "Rock", isDone: true },
    //     { id: 3, text: "Pop", isDone: false },
    //     { id: 4, text: "Rap", isDone: false },
    // ]

    const [tasks, setTasks] = useState<Array<TasksPropsType>>(
        [
            { id: 1, text: "HTML&CSS", isDone: true },
            { id: 2, text: "JS", isDone: true },
            { id: 3, text: "React", isDone: false },
            { id: 4, text: "Redux", isDone: false },
            { id: 5, text: 'Typescript', isDone: true },
            { id: 6, text: 'RTK query', isDone: false },
        ]
    )

    const removeTasks = (id: number) => {
        const removeTask = tasks.filter(t => t.id !== id)
        setTasks(removeTask)
    }

    const [filter, setFilter] = useState<FilteredTaskType>("all")
    let filterTasks: Array<TasksPropsType> = tasks
    if (filter === "active") {
        filterTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filterTasks = tasks.filter(t => t.isDone === true)
    }

    const changeFilter = (nevFilterValue: FilteredTaskType) => setFilter(nevFilterValue)

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={filterTasks}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />
            {/* <TodoList title={"What to listen"} tasks={tasks2} />
 */}        </div>
    );
}

export default App;
