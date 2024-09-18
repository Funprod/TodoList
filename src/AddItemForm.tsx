import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addItemBtnHandler = () => {
        if (inputValue && inputValue.trim()) {
            props.addItem(inputValue.trim())
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
            addItemBtnHandler()
        }
    }

    return (
        <div>
            <input value={inputValue}
                   onChange={changeInputValue}
                   onKeyDown={keyDownInputValue}
                   className={error ? "input-error" : ""}
            />
            <Button onClickHandler={addItemBtnHandler} title={"+"}/>
            {error && <div style={{color: "red"}}> Title is required</div>}
        </div>
    )
}