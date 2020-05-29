import {profileAPI} from "../api/api"
import {UserContactsType, UserPhotosType, UserType} from "../types/User"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"



const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'profile/SET_USER_STATUS'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'
const SET_IS_LOADING_STATUS = 'profile/SET_IS_LOADING_STATUS'
const SET_IS_LOADING_AVATAR = 'profile/SET_IS_LOADING_AVATAR'
const SET_IS_LOADING_PROFILE_INFO_CHANGES = 'profile/SET_IS_LOADING_PROFILE_INFO_CHANGES'



let initialState = {
    profile: null as UserType | null,
    isLoadingAvatar: false,
    isLoadingProfileInfoChanges: false,
    status: null as string | null,
    isLoadingStatus: false,
}

export type InitialStateType = typeof initialState


const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }

        case SAVE_PHOTO_SUCCESS:
            if(state.profile){
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos}
                }
            }else{
                return state
            }

        case SET_IS_LOADING_STATUS:
            return {
                ...state,
                isLoadingStatus: action.status
            }

        case SET_IS_LOADING_PROFILE_INFO_CHANGES:
            return {
                ...state,
                isLoadingProfileInfoChanges: action.status
            }

        case SET_IS_LOADING_AVATAR:
            return {
                ...state,
                isLoadingAvatar: action.status
            }

        default:
            return state

    }
}




type ActionTypes = SetUserProfileActionType | SetUserStatusActionType | SavePhotoSuccessActionType | SetIsLoadingStatusActionType | SetIsLoadingProfileInfoChangesActionType | SetIsLoadingAvatarActionType

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: UserType | null
}
export const setUserProfile = (profile: UserType): SetUserProfileActionType => ({ type: SET_USER_PROFILE,  profile})

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string | null
}
export const setUserStatus = (status: string | null): SetUserStatusActionType => ({ type: SET_USER_STATUS,  status})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: UserPhotosType
}
export const savePhotoSuccess = (photos: UserPhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS,  photos})

type SetIsLoadingStatusActionType = {
    type: typeof SET_IS_LOADING_STATUS
    status: boolean
}
export const setIsLoadingStatus = (status: boolean): SetIsLoadingStatusActionType => ({ type: SET_IS_LOADING_STATUS,  status})

type SetIsLoadingProfileInfoChangesActionType = {
    type: typeof SET_IS_LOADING_PROFILE_INFO_CHANGES
    status: boolean
}
export const setIsLoadingProfileInfoChanges = (status: boolean): SetIsLoadingProfileInfoChangesActionType => ({ type: SET_IS_LOADING_PROFILE_INFO_CHANGES,  status})

type SetIsLoadingAvatarActionType = {
    type: typeof SET_IS_LOADING_AVATAR
    status: boolean
}
export const setIsLoadingAvatar = (status: boolean): SetIsLoadingAvatarActionType => ({ type: SET_IS_LOADING_AVATAR,  status})



type ThunkVoidType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkReturnType = ThunkAction<Promise<string>, AppStateType, unknown, ActionTypes>

export const getUserProfile = (userId: number): ThunkVoidType => {
    return async (dispatch) => {
        if(userId){
            const response = await profileAPI.getUsersProfile(userId)
            dispatch(setUserProfile(response))
            dispatch(getUserStatus(userId))
        }
    }
}

export const getUserStatus = (userId: number): ThunkVoidType => async (dispatch) => {
    dispatch(setIsLoadingStatus(true))
    dispatch(setUserStatus(null))

    if(userId){
        const response = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(response))
        dispatch(setIsLoadingStatus(false))
    }
}

export const updateUserStatus = (status: string | null): ThunkReturnType => async (dispatch) => {
    dispatch(setIsLoadingStatus(true))

    const response = await profileAPI.updateStatus(status)
    dispatch(setIsLoadingStatus(false))
    if(response.data.resultCode === 0){
        dispatch(setUserStatus(status))
        return Promise.resolve('Status updated')
    }else{
        return Promise.reject('Server error')
    }
}

export const savePhoto = (file: File): ThunkVoidType => async (dispatch) => {
    dispatch(setIsLoadingAvatar(true))
    const response = await profileAPI.savePhoto(file)
    dispatch(setIsLoadingAvatar(false))

    if(response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileInfo = (profileInfo: {
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string,
    contacts: UserContactsType
}): ThunkReturnType => async (dispatch, getState) => {

    dispatch(setIsLoadingProfileInfoChanges(true))

    const userId: number | null = await getState().auth.userId
    const response = await profileAPI.saveProfileInfo(profileInfo)

    dispatch(setIsLoadingProfileInfoChanges(false))

    if(response.data.resultCode === 0){
        if(userId){
            await dispatch(getUserProfile(userId))
        }
        return Promise.resolve('Profile updated')
    }else if(response.data.messages){
        console.log('reject')
        return Promise.reject(response.data.messages[0])
    }
    return Promise.reject('Server error')
}


export default profileReducer