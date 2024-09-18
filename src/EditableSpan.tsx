import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeItemTitle: (title: string) => void
}

export const EditableSpan = ({title, changeItemTitle}: EditableSpanPropsType) => {
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
        ? <input
            value={newTitle}
            onBlur={offEditMode}
            onChange={onChangeNewTitle}
            autoFocus
            />
        : <span onDoubleClick={onEditMode}>{title}</span>
    )
}