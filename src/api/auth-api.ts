import {instance, ResultCodesEnum, ResultCodesWithCaptchaEnum, APIResponseType} from "./api";



export type CheckAuthResponseType = {
    id: number
    email: string
    login: string
}

export type LoginResponseType = {
    userId: number
}



export const authAPI = {

    checkAuth(){
        return (
            instance.get<APIResponseType<CheckAuthResponseType>>(`auth/me`)
                .then(response => {
                    return response.data
                })
        )
    },

    login(email: string, password: string, rememberMe = false, captcha = null as string | null){
        return (
            instance.post<APIResponseType<LoginResponseType, ResultCodesEnum & ResultCodesWithCaptchaEnum>>(`auth/login`, {email, password,rememberMe,captcha})
        )
    },

    logout(){
        return (
            instance.delete<APIResponseType>(`auth/login`)
        )
    }

}
