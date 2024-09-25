import { ChangeEvent, useState } from "react"
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Box, Button, Checkbox, IconButton, List, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { filterButtonsContainerSx, getIsDoneItem, ListItemSx } from "./Todolist.styles";

export type FilteredTaskType = "all" | "active" | "completed"

type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    todolistId: string
    removeTasks: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export type TasksPropsType = {
    id: string
    text: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const [filter, setFilter] = useState<FilteredTaskType>("all")

    let filterTasks: Array<TasksPropsType> = props.tasks
    if (filter === "active") {
        filterTasks = props.tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filterTasks = props.tasks.filter(t => t.isDone === true)
    }

    const task: Array<JSX.Element> = filterTasks.map((t) => {
        const onRemoveHandler = () => {
            props.removeTasks(t.id, props.todolistId)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
        }
        const changeTaskTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todolistId)
        }
        return (
            <ListItem
                key={t.id}
                disablePadding
                sx={ListItemSx}
            >
                <Box>
                    <Checkbox
                        size="small"
                        checked={t.isDone}
                        onChange={changeTaskStatusHandler} />
                    <EditableSpan
                        title={t.text}
                        changeItemTitle={changeTaskTitleHandler}
                        classes={getIsDoneItem(t.isDone)}
                    />
                </Box>
                <IconButton
                    size="small"
                    color="inherit"
                    onClick={onRemoveHandler}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItem >
        )
    })

    const addTaskBtnHandler = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }


    const changeFilter = (nevFilterValue: FilteredTaskType) => setFilter(nevFilterValue)

    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)

    return (
        <Box sx={filterButtonsContainerSx}>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={changeTodolistTitleHandler} />
                <IconButton
                    size="small"
                    color="inherit"
                    onClick={removeTodolistHandler}
                >
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskBtnHandler} />
            <List>
                {task}
            </List>
            <div>
                <Button variant="contained"
                    color={filter === "all" ? "primary" : "inherit"}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    variant="contained"
                    color={filter === "active" ? "primary" : "inherit"}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    variant="contained"
                    color={filter === "completed" ? "primary" : "inherit"}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </Box>
    )
}