import { v1 } from 'uuid';
import { TodolistType } from '../../../../app/App';

const initState: TodolistType[] = [];

export const todolistsReducer = (state: TodolistType[] = initState, action: ActionTodolistsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            const { todolistId } = action.payload;
            return state.filter((tl) => tl.id !== todolistId);
        }
        case 'ADD_TODOLIST': {
            const { title, todolistId } = action.payload;
            return [{ id: todolistId, title }, ...state];
        }
        case 'CHANGE_TODOLIST_TITLE': {
            const { newTitle, todolistId } = action.payload;
            return state.map((tl) => (tl.id === todolistId ? { ...tl, title: newTitle } : tl));
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (payload: { todolistId: string }) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload,
    } as const;
};

export const addTodolistAC = (title: string) => {
    debugger;
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            todolistId: v1(),
        },
    } as const;
};

export const changeTodolistTitleAC = (payload: { newTitle: string; todolistId: string }) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload,
    } as const;
};

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>;

export type ActionTodolistsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleAC;
