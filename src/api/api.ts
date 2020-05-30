import axios from 'axios'
import {UserContactsType, UserType} from "../types/User"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '321994fc-144a-4c0e-a36e-a2437572c56d'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesWithCaptchaEnum {
    CaptchaIsRequired = 10
}


type UsersUserType = {
    id: number
    name: string
    status: string | null
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}

type RequestUsersResponseType = {
    items: Array<UsersUserType>
    totalCount: number
    error: string
}

type FollowResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const usersAPI = {

    requestUsers(currentPage = 1, onPageLimit = 10){
        return (
            instance.get<RequestUsersResponseType>(`users?page=${currentPage}&count=${onPageLimit}`)
                .then(response => {
                    return response.data
                })
        )
    },

    follow(userId: number){
        return (
            instance.post<FollowResponseType>(`follow/${userId}`, {})
                .then(response => {
                    return response.data
                })
        )
    },

    unfollow(userId: number){
        return (
            instance.delete<FollowResponseType>(`follow/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },


}



type UpdateStatusResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

type SavePhotoResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {
        photos: {
            small: string | null
            large: string | null
        }
    }
}

type SaveProfileInfoResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const profileAPI = {
    getUsersProfile(userId: number){
        return (
            instance.get<UserType>(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId: number){
        return(
            instance.get<string | null>(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateStatus(status: string | null){
        return(
            instance.put<UpdateStatusResponseType>(`profile/status`, {status:status})
        )
    },
    savePhoto(photoFile: File){
        let formData = new FormData()
        formData.append('image', photoFile)
        return(
            instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    return response.data
                })
        )
    },

    saveProfileInfo(profile: {
        aboutMe: string | null
        lookingForAJob: boolean
        lookingForAJobDescription: string | null
        fullName: string,
        contacts: UserContactsType
    }){
        return(
            instance.put<SaveProfileInfoResponseType>(`profile`, profile)
        )
    }
}



type checkAuthType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum & ResultCodesWithCaptchaEnum
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    checkAuth(){
        return (
            instance.get<checkAuthType>(`auth/me`)
                .then(response => {
                    return response.data
                })
        )
    },
    login(email: string, password: string, rememberMe = false, captcha = null as string | null){
        return (
            instance.post<LoginResponseType>(`auth/login`, {email, password,rememberMe,captcha})
        )
    },
    logout(){
        return (
            instance.delete<LogoutResponseType>(`auth/login`)
        )
    }
}



type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl(){
        return (
            instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
                .then(response => {
                    return response.data.url
                })
        )
    }
}







