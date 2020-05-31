import {instance, APIResponseType} from "./api"



export type UsersUserType = {
    id: number
    name: string
    status: string | null
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
}

export type RequestUsersResponseType = {
    items: Array<UsersUserType>
    totalCount: number
    error: string
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
            instance.post<APIResponseType>(`follow/${userId}`, {})
                .then(response => {
                    return response.data
                })
        )
    },

    unfollow(userId: number){
        return (
            instance.delete<APIResponseType>(`follow/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    }

}