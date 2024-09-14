import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "./Button"

export type FilteredTaskType = "all" | "active" | "completed"

type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    // filter: string
    todolistId: string
    removeTasks: (id: string, todolistId: string) => void
    // changeFilter: any
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}

export type TasksPropsType = {
    id: string
    text: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState<boolean>(false)
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
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                <span className={t.isDone ? "task-done" : "task"}>{t.text}</span>
                <Button title="X" onClickHandler={onRemoveHandler} />
            </li >
        )
    })

    const addTaskBtnHandler = () => {
        if (inputValue && inputValue.trim()) {
            props.addTask(inputValue.trim(), props.todolistId)
            setInputValue("")
        } else {
            setError(true)
        }
        setInputValue("")
    }

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInputValue(e.currentTarget.value)
    }

    const keyDownInputValue = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskBtnHandler()
        }
    }



    const changeFilter = (nevFilterValue: FilteredTaskType) => setFilter(nevFilterValue)

    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)

    return (
        <div className='todoList'>
            <h3>
                {props.title}
                <Button title="X" onClickHandler={removeTodolistHandler} />
            </h3>
            <div>
                <input value={inputValue}
                    onChange={changeInputValue}
                    onKeyDown={keyDownInputValue}
                    className={error ? "input-error" : ""}
                />
                <Button onClickHandler={addTaskBtnHandler} title={"+"} />
                {error && <div style={{ color: "red" }}> Title is required</div>}
            </div>
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