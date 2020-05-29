import {AppStateType} from "./redux-store";

export const getUserId = (state: AppStateType) => {
    return state.auth.userId;
}

export const getEmail = (state: AppStateType) => {
    return state.auth.email;
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login;
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl;
}
export const getIsLoading = (state: AppStateType) => {
    return state.auth.isLoading;
}