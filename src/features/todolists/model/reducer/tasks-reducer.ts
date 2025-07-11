import { v1 } from 'uuid';
import { TasksType } from '../../../../app/App';
import { AddTodolistACType, RemoveTodolistACType } from './todolists-reducer';

const initStateTask: TasksType = {};

export const tasksReducer = (state: TasksType = initStateTask, action: ActionTasksType) => {
    switch (action.type) {
        case 'ADD_TASK': {
            const { title, todolistId } = action.payload;
            return {
                ...state,
                [todolistId]: [{ id: v1(), title, isDone: false }, ...state[todolistId]],
            };
        }
        case 'REMOVE_TASK': {
            const { id, todolistId } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].filter((t) => t.id !== id),
            };
        }
        case 'CHANGE_TASK_STATUS': {
            const { taskId, newIsDone, todolistId } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, isDone: newIsDone } : t)),
            };
        }
        case 'CHANGE_TASK_TITLE': {
            const { taskId, newTitle, todolistId } = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)),
            };
        }
        case 'ADD_TODOLIST': {
            const { todolistId } = action.payload;
            return { ...state, [todolistId]: [] };
        }
        case 'REMOVE_TODOLIST': {
            const { todolistId } = action.payload;
            const stateCopy = { ...state };
            delete stateCopy[todolistId];
            return stateCopy;
        }
        default:
            return state;
    }
};

export const addTaskAC = (payload: { title: string; todolistId: string }) => {
    return {
        type: 'ADD_TASK',
        payload,
    } as const;
};

export const removeTaskAC = (payload: { id: string; todolistId: string }) => {
    return {
        type: 'REMOVE_TASK',
        payload,
    } as const;
};

export const changeTaskStatusAC = (payload: { taskId: string; newIsDone: boolean; todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload,
    } as const;
};

export const changeTaskTitleAC = (payload: { taskId: string; newTitle: string; todolistId: string }) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload,
    } as const;
};

export type addTaskACType = ReturnType<typeof addTaskAC>;
export type removeTaskACType = ReturnType<typeof removeTaskAC>;
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

export type ActionTasksType =
    | addTaskACType
    | removeTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType;
