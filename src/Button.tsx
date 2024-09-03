
type ButtonPropsType = {
    title: string
    onClickHandler?: () => void
    classes?: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button className={props.classes} onClick={props.onClickHandler}>{props.title}</button>
    )
}