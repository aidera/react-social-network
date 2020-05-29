import {checkAuth} from './auth-reducer'
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"



const SET_INITIAL = 'app/SET_INITIAL'
const SET_GLOBAL_ERROR = 'app/SET_GLOBAL_ERROR'



let initialState = {
    initialized: false,
    globalError: null as string | null
}

export type InitialStateType = typeof initialState



const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case SET_INITIAL:
            return {
                ...state,
                initialized: true
            };

        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.error
            };

        default:
            return state;

    }
}



type ActionTypes = SetInitialActionType | SetGlobalErrorActionType

type SetInitialActionType = {
    type: typeof SET_INITIAL
}
export const setInitial = (): SetInitialActionType => ({ type: SET_INITIAL })

type SetGlobalErrorActionType = {
    type: typeof SET_GLOBAL_ERROR
    error: string
}
export const setGlobalError = (error: string): SetGlobalErrorActionType => ({ type: SET_GLOBAL_ERROR, error })



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const initializeApp = ():ThunkType => async (dispatch) => {
    await dispatch(checkAuth())
    dispatch(setInitial())
}



export default appReducer