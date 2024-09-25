import { SxProps } from "@mui/material";

export const filterButtonsContainerSx: SxProps = {
    fontFamily: "sans-serif",
    padding: "10px",
    border: "2px solid black",
    borderRadius: "5px",
    fontWeight: "bold",
    height: "100%",
};

export const ListItemSx: SxProps = {
    p: 0,
    justifyContent: "space-between",
};

export const getIsDoneItem = (isDone: boolean): SxProps => ({
    opacity: isDone ? 0.5 : 1,
});
