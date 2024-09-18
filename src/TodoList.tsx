import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
            props.changeTaskTitle(t.id, newTitle,  props.todolistId)
        }
        return (
            <li key={t.id} className={t.isDone ? "task-done" : "task"}>
                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan  title={t.text} changeItemTitle={changeTaskTitleHandler}/>
                <Button title="X" onClickHandler={onRemoveHandler} />
            </li >
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
        <div className='todoList'>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={changeTodolistTitleHandler} />
                <Button title="X" onClickHandler={removeTodolistHandler} />
            </h3>
                <AddItemForm addItem={addTaskBtnHandler}/>
            <ul>
                {task}
            </ul>
            <div>
                <Button classes={filter === "all" ? "filter-btn-active" : ""} title={"All"} onClickHandler={onAllClickHandler} />
                <Button classes={filter === "active" ? "filter-btn-active" : ""} title={"Active"} onClickHandler={onActiveClickHandler} />
                <Button classes={filter === "completed" ? "filter-btn-active" : ""} title={"Completed"} onClickHandler={onCompletedClickHandler} />
            </div>
        </div>
    )
}