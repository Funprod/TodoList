import React, { useState } from 'react';
import './App.css';
import { TasksPropsType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from "./AddItemForm";
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from './MenuButton';

type ThemeMode = 'dark' | 'light'

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
        setTasks({ ...tasks, [newTodo.id]: [] })

    }

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        const newTodo = todolist.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl)
        setTodolist(newTodo)
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: "rgb(23, 145, 78)"
            }
        }
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <AppBar position="static" sx={{ mb: "30px" }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Box>
                            <MenuButton background={theme.palette.primary.dark} color="inherit">Login</MenuButton>
                            <MenuButton background={theme.palette.primary.dark} color="inherit">Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.light} color="inherit">Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid2 container sx={{ mb: "30px", justifyContent: "center" }}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {todolist.map(tl => {
                            return (
                                <Paper elevation={8} sx={{ mb: "30px" }}>
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
                                </Paper>
                            )
                        })}
                    </Grid2>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
