import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import profileReducer from "./profile-reducer";
import postsReducer from "./posts-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";



let rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    postsPage: postsReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<AT extends Action, R = void> = ThunkAction<Promise<R>, AppStateType, unknown, AT>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// @ts-ignore
// window.__store__ = store;


export default store;