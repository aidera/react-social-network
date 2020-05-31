import {checkAuth} from './auth-reducer'
import {BaseThunkType, InferActionsTypes} from "./redux-store"





let initialState = {
    initialized: false,
    globalError: null as string | null
}
export type InitialStateType = typeof initialState





const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case 'app/SET_INITIAL':
            return {
                ...state,
                initialized: true
            };

        case 'app/SET_GLOBAL_ERROR':
            return {
                ...state,
                globalError: action.error
            };

        default:
            return state;

    }
}






export const actions = {
    setInitial: () => ({ type: 'app/SET_INITIAL' } as const),
    setGlobalError:  (error: string) => ({ type: 'app/SET_GLOBAL_ERROR', error } as const)
}
type ActionTypes = InferActionsTypes<typeof actions>





export const initializeApp = ():BaseThunkType<ActionTypes> => async (dispatch) => {
    await dispatch(checkAuth())
    dispatch(actions.setInitial())
}





export default appReducer