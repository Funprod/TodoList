import { RootState } from './store';

export const selectTodolist = (state: RootState) => state.todolistsReducer;

export const selectTasks = (state: RootState) => state.tasksReducer;
