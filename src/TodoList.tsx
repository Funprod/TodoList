import { FilteredTaskType } from "./App"
import { Button } from "./Button"

type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTasks: (id: number) => void
    changeFilter: (nevFilterValue: FilteredTaskType) => void
}

export type TasksPropsType = {
    id: number
    text: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const task: Array<JSX.Element> = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} />
                <span>
                    {t.text}
                </span>
                <Button title="X" onClickHandler={() => props.removeTasks(t.id)} />
            </li >
        )
    })

    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <div>
                <input />
                <Button title={"+"} />
            </div>
            <ul>
                {task}
            </ul>
            <div>
                <Button title={"All"} onClickHandler={() => props.changeFilter("all")} />
                <Button title={"Active"} onClickHandler={() => props.changeFilter("active")} />
                <Button title={"Completed"} onClickHandler={() => props.changeFilter("completed")} />
            </div>
        </div>
    )
}