import React, { useState } from 'react';
import './App.css';
import { TasksPropsType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import {AddItemForm} from "./AddItemForm";



type TasksType = {
    [todolistId: string]: TasksPropsType[]
}

type TodolistType = {
    id: string
    title: string
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, setTodolist] = useState<TodolistType[]>([
        { id: todolistId1, title: "What to learn" },
        { id: todolistId2, title: "What to bye" },

    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            { id: v1(), text: "HTML&CSS", isDone: true },
            { id: v1(), text: "JS", isDone: true },
            { id: v1(), text: "React", isDone: false },
            { id: v1(), text: "Redux", isDone: false },
            { id: v1(), text: 'Typescript', isDone: true },
            { id: v1(), text: 'RTK query', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), text: "Milk", isDone: true },
            { id: v1(), text: "Bread", isDone: true },
            { id: v1(), text: "butter", isDone: false },
        ],

    })


    const addTask = (title: string, todolistId: string) => {
        const newTask: TasksPropsType = {
            id: v1(),
            text: title,
            isDone: false,
        }
        const newState: TasksType = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
        setTasks(newState)
    }


    const removeTasks = (id: string, todolistId: string) => {
        const removeTask = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) }
        // const removeTask = tasks.filter(t => t.id !== id)
        setTasks(removeTask)
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const newState = { ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t) }
        setTasks(newState)
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const newState = { ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, text: newTitle } : t) }
        setTasks(newState)
    }

    const removeTodolist = (todolistId: string) => {
        const newState = todolist.filter(tl => tl.id !== todolistId)
        setTodolist(newState)
    }

    const addTodolist = (title: string) => {
        const newTodo: TodolistType = {
            id: v1(),
            title: title,
        }
        setTodolist([...todolist, newTodo])
        setTasks({...tasks, [newTodo.id]: []})

    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const newTodo = todolist.map(tl => tl.id === todolistId ? {...tl, title: newTitle}: tl)
        setTodolist(newTodo)
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolist.map(tl => {
                return (
                    <TodoList
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTasks={removeTasks}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
