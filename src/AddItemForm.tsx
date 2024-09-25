import { Button, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, KeyboardEvent, useState } from "react";

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
            <TextField
                size='small'
                variant='outlined'
                label="Type value"
                value={inputValue}
                onChange={changeInputValue}
                onKeyUp={keyDownInputValue}
                error={error}
                helperText={error ? 'Title is required' : ''}
            />
            <IconButton
                size="small"
                color="primary"
                onClick={addItemBtnHandler}
            >
                <AddCircleOutlineIcon />
            </IconButton>
        </div>
    )
}