import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '321994fc-144a-4c0e-a36e-a2437572c56d'
    }
});


export const usersAPI = {

    requestUsers(currentPage = 1, pageSize = 10){
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data
                })
        )
    },
    follow(userId){
        return (
            instance.post(`follow/${userId}`, {})
                .then(response => {
                    return response.data
                })
        )
    },

    unfollow(userId){
        return (
            instance.delete(`follow/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },


};

export const profileAPI = {
    getUsersProfile(userId){
        return (
            instance.get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId){
        return(
            instance.get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateStatus(status){
            return(
                instance.put(`profile/status`, {status:status})
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
    login(email, password,rememberMe=false){
        return (
            instance.post(`auth/login`, {email, password,rememberMe})
        );
    },
    logout(){
        return (
            instance.delete(`auth/login`)
        );
    },
};







