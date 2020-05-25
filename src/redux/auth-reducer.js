import {authAPI, securityAPI} from "../api/api";


const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';
const DELETE_CAPTCHA = 'auth/DELETE_CAPTCHA';
const SET_IS_LOADING = 'auth/SET_IS_LOADING';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    isLoading: false
};



const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            };

        case DELETE_CAPTCHA:
            return {
                ...state,
                captchaUrl: null
            };

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.status
            };


        default:
            return state;

    }
}



export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth} });
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL, payload: {captchaUrl} });
export const deleteCaptcha = () => ({ type: DELETE_CAPTCHA });
export const setIsLoading = (status) => ({ type: SET_IS_LOADING, status });

export const checkAuth = () => async (dispatch) => {

    return new Promise(async (resolve, reject) => {
        const checkout = await authAPI.checkAuth()
        if(checkout.data){
            if(checkout.resultCode === 0){
                const {id, login, email} = checkout.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
            return resolve(checkout)
        }
        return new Error('Server error')
    })

}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    dispatch(setIsLoading(true));

    const response = await authAPI.login(email, password, rememberMe, captcha)

    if(response.data.resultCode === 0){
        await dispatch(checkAuth());
        dispatch(deleteCaptcha());
        dispatch(setIsLoading(false));
        return Promise.resolve(null);
    }else{
        if (response.data.resultCode === 10){
            await dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Server error. Please, try later';
        dispatch(setIsLoading(false));
        return Promise.reject(message);
    }

}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captcha = response.data.url;
    dispatch(getCaptchaUrlSuccess(captcha));

}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if(response.data.resultCode === 0){
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;