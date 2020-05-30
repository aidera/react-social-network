export type UserContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}
export type UserPhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    userId: number
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    photos: UserPhotosType
    contacts: UserContactsType
}



export type UserTypeFromUsersPageApi = {
    id: number
    name: string
    status: string | null
    photos: UserPhotosType
    followed: boolean
}