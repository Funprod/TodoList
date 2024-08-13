import { Button } from "./Button"

type TodoListPropsType = {
    title: string
    tasks: Array<TasksPropsType>
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
                <Button title={"All"} />
                <Button title={"Active"} />
                <Button title={"Completed"} />
            </div>
        </div>
    )
}