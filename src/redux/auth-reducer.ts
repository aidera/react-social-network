import {authAPI, ResultCodesEnum, ResultCodesWithCaptchaEnum, securityAPI} from "../api/api"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "./redux-store"



let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    isLoading: false
}

export type InitialStateType = typeof initialState



const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case 'auth/SET_AUTH_USER_DATA':
        case 'auth/GET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }

        case 'auth/DELETE_CAPTCHA':
            return {
                ...state,
                captchaUrl: null
            }

        case 'auth/SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.status
            }


        default:
            return state

    }
}



type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData:
        (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
            ({ type: 'auth/SET_AUTH_USER_DATA', payload: {userId, email, login, isAuth} } as const),

    getCaptchaUrlSuccess: (captchaUrl: string | null) =>
        ({ type: 'auth/GET_CAPTCHA_URL', payload: {captchaUrl} } as const),

    deleteCaptcha: () =>
        ({ type: 'auth/DELETE_CAPTCHA' } as const),

    setIsLoading: (status: boolean) =>
        ({ type: 'auth/SET_IS_LOADING', status } as const)
}



type ThunkVoidType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkReturnType = ThunkAction<Promise<string>, AppStateType, unknown, ActionTypes>

export const checkAuth = (): ThunkVoidType => async (dispatch) => {
    const checkout = await authAPI.checkAuth()
    if(checkout.data){
        if(checkout.resultCode === ResultCodesEnum.Success){
            const {id, login, email} = checkout.data
            dispatch(actions.setAuthUserData(id, email, login, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkReturnType => async (dispatch) => {
    dispatch(actions.setIsLoading(true))

    const response = await authAPI.login(email, password, rememberMe, captcha)

    if(response.data.resultCode === ResultCodesEnum.Success){
        await dispatch(checkAuth())
        dispatch(actions.deleteCaptcha())
        dispatch(actions.setIsLoading(false))
        return Promise.resolve('Logged in')
    }else {
        dispatch(actions.setIsLoading(false))

        if (response.data.resultCode === ResultCodesWithCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
            return Promise.reject('Need to write a captcha')
        }else if(response.data.resultCode === 1){
            return Promise.reject('Incorrect login or password')
        }else{
            return Promise.reject('Server error')
        }
    }


}

export const getCaptchaUrl = (): ThunkVoidType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    dispatch(actions.getCaptchaUrlSuccess(response))
}

export const logout = (): ThunkVoidType => async (dispatch) => {
    const response = await authAPI.logout()
    if(response.data.resultCode === ResultCodesEnum.Success){
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}



export default authReducer