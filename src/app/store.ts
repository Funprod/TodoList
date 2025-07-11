import { combineReducers, legacy_createStore } from 'redux';
import { todolistsReducer } from '../features/todolists/model/reducer/todolists-reducer';
import { tasksReducer } from '../features/todolists/model/reducer/tasks-reducer';

export const rootReducer = combineReducers({
    todolistsReducer,
    tasksReducer,
});

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
