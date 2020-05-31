import {UserContactsType} from "../types/User"
import {ProfileType} from "../types/Profile"
import {instance, APIResponseType} from "./api"



export type SavePhotoResponseType = {
    photos: {
        small: string | null
        large: string | null
    }
}



export const profileAPI = {

    getUsersProfile(userId: number){
        return (
            instance.get<ProfileType>(`profile/${userId}`)
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
            instance.put<APIResponseType>(`profile/status`, {status:status})
        )
    },

    savePhoto(photoFile: File){
        let formData = new FormData()
        formData.append('image', photoFile)
        return(
            instance.put<APIResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
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
            instance.put<APIResponseType>(`profile`, profile)
        )
    }

}