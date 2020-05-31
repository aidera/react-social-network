import {UserContactsType, UserPhotosType} from "./User";

export type ProfileType = {
    userId: number
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    photos: UserPhotosType
    contacts: UserContactsType
}