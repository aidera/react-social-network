export const getUserId = (state) => {
    return state.auth.userId;
}

export const getEmail = (state) => {
    return state.auth.email;
}

export const getLogin = (state) => {
    return state.auth.login;
}

export const getIsAuth = (state) => {
    return state.auth.isAuth;
}

export const getCaptchaUrl = (state) => {
    return state.auth.captchaUrl;
}
export const getIsLoading = (state) => {
    return state.auth.isLoading;
}