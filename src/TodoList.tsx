import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilteredTaskType } from "./App"
import { Button } from "./Button"

type TodoListPropsType = {
    title: string[]
    tasks: Array<TasksPropsType>
    filter: string
    removeTasks: (id: string) => void
    changeFilter: (nevFilterValue: FilteredTaskType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export type TasksPropsType = {
    id: string
    text: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState<boolean>(false)

    const task: Array<JSX.Element> = props.tasks.map((t) => {
        const onRemoveHandler = () => {
            props.removeTasks(t.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
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
            props.addTask(inputValue.trim())
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

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
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
                <Button classes={props.filter === "all" ? "filter-btn-active" : ""} title={"All"} onClickHandler={onAllClickHandler} />
                <Button classes={props.filter === "active" ? "filter-btn-active" : ""} title={"Active"} onClickHandler={onActiveClickHandler} />
                <Button classes={props.filter === "completed" ? "filter-btn-active" : ""} title={"Completed"} onClickHandler={onCompletedClickHandler} />
            </div>
        </div>
    )
}