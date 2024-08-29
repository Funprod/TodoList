import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilteredTaskType } from "./App"
import { Button } from "./Button"

type TodoListPropsType = {
    title: string[]
    tasks: Array<TasksPropsType>
    removeTasks: (id: string) => void
    changeFilter: (nevFilterValue: FilteredTaskType) => void
    addTask: (title: string) => void
}

export type TasksPropsType = {
    id: string
    text: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const [inputValue, setInputValue] = useState("")

    const task: Array<JSX.Element> = props.tasks.map((t) => {
        const onRemoveHandler = () => {
            props.removeTasks(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.text}</span>
                <Button title="X" onClickHandler={onRemoveHandler} />
            </li >
        )
    })

    const addTaskBtnHandler = () => {
        props.addTask(inputValue)
        setInputValue("")
    }

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

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
                />
                <Button onClickHandler={addTaskBtnHandler} title={"+"} />
            </div>
            <ul>
                {task}
            </ul>
            <div>
                <Button title={"All"} onClickHandler={onAllClickHandler} />
                <Button title={"Active"} onClickHandler={onActiveClickHandler} />
                <Button title={"Completed"} onClickHandler={onCompletedClickHandler} />
            </div>
        </div>
    )
}