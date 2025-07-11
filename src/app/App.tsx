import React, { useState } from 'react';
import './App.css';
import { TasksPropsType, TodoList } from '../TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from '../AddItemForm';
import {
    AppBar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid2,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuButton } from '../MenuButton';
import { useSelector } from 'react-redux';
import { selectTasks, selectTodolist } from './app-selectors';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from '../features/todolists/model/reducer/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from '../features/todolists/model/reducer/tasks-reducer';

type ThemeMode = 'dark' | 'light';

export type TasksType = {
    [todolistId: string]: TasksPropsType[];
};

export type TodolistType = {
    id: string;
    title: string;
};
export const todolistId1 = v1();
export const todolistId2 = v1();

function App() {
    const todolist = useSelector(selectTodolist);
    const tasks = useSelector(selectTasks);
    const dispatch = useAppDispatch();

    // const [todolist, setTodolist] = useState<TodolistType[]>([
    //     { id: todolistId1, title: 'What to learn' },
    //     { id: todolistId2, title: 'What to bye' },
    // ]);
    // const [tasks, setTasks] = useState<TasksType>({
    //     [todolistId1]: [
    //         { id: v1(), text: 'HTML&CSS', isDone: true },
    //         { id: v1(), text: 'JS', isDone: true },
    //         { id: v1(), text: 'React', isDone: false },
    //         { id: v1(), text: 'Redux', isDone: false },
    //         { id: v1(), text: 'Typescript', isDone: true },
    //         { id: v1(), text: 'RTK query', isDone: false },
    //     ],
    //     [todolistId2]: [
    //         { id: v1(), text: 'Milk', isDone: true },
    //         { id: v1(), text: 'Bread', isDone: true },
    //         { id: v1(), text: 'butter', isDone: false },
    //     ],
    // });

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({ title, todolistId }));
    };

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC({ id, todolistId }));
    };

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({ taskId, newIsDone, todolistId }));
    };
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC({ taskId, newTitle, todolistId }));
    };

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC({ todolistId }));
    };

    const addTodolist = (title: string) => {
        debugger;
        dispatch(addTodolistAC(title));
    };

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC({ newTitle, todolistId }));
    };

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: 'rgb(23, 145, 78)',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <AppBar position="static" sx={{ mb: '30px' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Box>
                            <MenuButton background={theme.palette.primary.dark} color="inherit">
                                Login
                            </MenuButton>
                            <MenuButton background={theme.palette.primary.dark} color="inherit">
                                Logout
                            </MenuButton>
                            <MenuButton background={theme.palette.primary.light} color="inherit">
                                Faq
                            </MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid2 container sx={{ mb: '30px', justifyContent: 'center' }}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {todolist.map((tl) => {
                            return (
                                <Paper elevation={8} sx={{ mb: '30px' }}>
                                    <TodoList
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTasks={removeTask}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            );
                        })}
                    </Grid2>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
