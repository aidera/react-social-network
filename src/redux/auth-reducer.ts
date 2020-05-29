import {authAPI, securityAPI} from "../api/api"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"



const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL'
const DELETE_CAPTCHA = 'auth/DELETE_CAPTCHA'
const SET_IS_LOADING = 'auth/SET_IS_LOADING'



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

        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }

        case DELETE_CAPTCHA:
            return {
                ...state,
                captchaUrl: null
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.status
            }


        default:
            return state

    }
}



type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | DeleteCaptchaActionType | SetIsLoadingActionType

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData =
    (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
    ({ type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth} })

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL
    payload: { captchaUrl: string | null }
}
export const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL, payload: {captchaUrl} })

type DeleteCaptchaActionType = {
    type: typeof DELETE_CAPTCHA
}
export const deleteCaptcha = (): DeleteCaptchaActionType => ({ type: DELETE_CAPTCHA })

type SetIsLoadingActionType = {
    type: typeof SET_IS_LOADING
    status: boolean
}
export const setIsLoading = (status: boolean): SetIsLoadingActionType => ({ type: SET_IS_LOADING, status })



type ThunkVoidType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkReturnType = ThunkAction<Promise<string>, AppStateType, unknown, ActionTypes>

export const checkAuth = (): ThunkVoidType => async (dispatch) => {
    const checkout = await authAPI.checkAuth()
    if(checkout.data){
        if(checkout.resultCode === 0){
            const {id, login, email} = checkout.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkReturnType => async (dispatch) => {
    dispatch(setIsLoading(true))

    const response = await authAPI.login(email, password, rememberMe, captcha)

    if(response.data.resultCode === 0){
        await dispatch(checkAuth())
        dispatch(deleteCaptcha())
        dispatch(setIsLoading(false))
        return Promise.resolve('Logged in')
    }else {
        dispatch(setIsLoading(false))
        if (response.data.resultCode === 10) {
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
    const captcha = response.data.url
    dispatch(getCaptchaUrlSuccess(captcha))
}

export const logout = (): ThunkVoidType => async (dispatch) => {
    const response = await authAPI.logout()
    if(response.data.resultCode === 0){
        dispatch(setAuthUserData(null, null, null, false))
    }
}



export default authReducer