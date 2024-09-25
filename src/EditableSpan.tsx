import { SxProps, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    changeItemTitle: (title: string) => void
    classes?: SxProps
}

export const EditableSpan = ({ title, changeItemTitle, classes }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>("");

    const onEditMode = () => {
        setEditMode(true);
        setNewTitle(title)
    }
    const offEditMode = () => {
        setEditMode(false);
        changeItemTitle(newTitle)
    }

    const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }


    return (
        editMode
            ? <TextField
                size="small"
                label="Change task"
                variant="standard"
                value={newTitle}
                onBlur={offEditMode}
                onChange={onChangeNewTitle}
                autoFocus
            />
            : <Typography sx={classes} component="span" onDoubleClick={onEditMode}>{title}</Typography>
    )
}