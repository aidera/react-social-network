import axios from 'axios'
import {UserContactsType} from "../types/User";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '321994fc-144a-4c0e-a36e-a2437572c56d'
    }
});


export const usersAPI = {

    requestUsers(currentPage = 1, onPageLimit = 10){

        return (
            instance.get(`users?page=${currentPage}&count=${onPageLimit}`)
                .then(response => {
                    return response.data
                })
        )
    },
    follow(userId: number){
        return (
            instance.post(`follow/${userId}`, {})
                .then(response => {
                    return response.data
                })
        )
    },

    unfollow(userId: number){
        return (
            instance.delete(`follow/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },


};

export const profileAPI = {
    getUsersProfile(userId: number){
        return (
            instance.get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId: number){
        return(
            instance.get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateStatus(status: string | null){
        return(
            instance.put(`profile/status`, {status:status})
        )
    },
    savePhoto(photoFile: File){
        let formData = new FormData();
        formData.append('image', photoFile);
        return(
            instance.put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
            instance.put(`profile`, profile)
        )
    }
}



export const authAPI = {
    checkAuth(){
        return (
            instance.get(`auth/me`)
                .then(response => {
                    return response.data
                })
        );
    },
    login(email: string, password: string, rememberMe = false, captcha = null as string | null){
        return (
            instance.post(`auth/login`, {email, password,rememberMe,captcha})
        );
    },
    logout(){
        return (
            instance.delete(`auth/login`)
        );
    },
};


export const securityAPI = {
    getCaptchaUrl(){
        return (
            instance.get(`security/get-captcha-url`)
        );
    },

};







