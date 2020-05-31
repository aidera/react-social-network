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
    id: number
    name: string
    status: string | null
    photos: UserPhotosType
    followed: boolean
}