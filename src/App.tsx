import React, { useState } from 'react';
import './App.css';
import { TasksPropsType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilteredTaskType = "all" | "active" | "completed"

function App() {
    const title = ["What to learn"]

    const [tasks, setTasks] = useState<Array<TasksPropsType>>(
        [
            { id: v1(), text: "HTML&CSS", isDone: true },
            { id: v1(), text: "JS", isDone: true },
            { id: v1(), text: "React", isDone: false },
            { id: v1(), text: "Redux", isDone: false },
            { id: v1(), text: 'Typescript', isDone: true },
            { id: v1(), text: 'RTK query', isDone: false },
        ]
    )

    const addTask = (title: string) => {
        const newTask: TasksPropsType = {
            id: v1(),
            text: title,
            isDone: false,
        }
        const newState: Array<TasksPropsType> = [newTask, ...tasks];
        setTasks(newState)
    }


    const removeTasks = (id: string) => {
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

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        const newState = tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t)
        setTasks(newState)
    }

    return (
        <div className="App">
            <TodoList
                title={title}
                tasks={filterTasks}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
            {/* <TodoList title={"What to listen"} tasks={tasks2} />
 */}        </div>
    );
}

export default App;
