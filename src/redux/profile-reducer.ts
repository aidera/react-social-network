import {ResultCodesEnum} from "../api/api"
import {profileAPI} from "../api/profile-api"
import {UserContactsType, UserPhotosType} from "../types/User"
import {ProfileType} from "../types/Profile"
import {BaseThunkType, InferActionsTypes} from "./redux-store"





let initialState = {
    profile: null as ProfileType | null,
    isLoadingAvatar: false,
    isLoadingProfileInfoChanges: false,
    status: null as string | null,
    isLoadingStatus: false,
}
export type InitialStateType = typeof initialState





const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'profile/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'profile/SAVE_PHOTO_SUCCESS':
            if(state.profile){
                return {
                    ...state,
                    profile: {...state.profile, photos: action.photos}
                }
            }else{
                return state
            }

        case 'profile/SET_IS_LOADING_STATUS':
            return {
                ...state,
                isLoadingStatus: action.status
            }

        case 'profile/SET_IS_LOADING_PROFILE_INFO_CHANGES':
            return {
                ...state,
                isLoadingProfileInfoChanges: action.status
            }

        case 'profile/SET_IS_LOADING_AVATAR':
            return {
                ...state,
                isLoadingAvatar: action.status
            }

        default:
            return state

    }
}





export const actions = {
    setUserProfile: (profile: ProfileType) =>
        ({ type: 'profile/SET_USER_PROFILE',  profile} as const),

    setUserStatus: (status: string | null) =>
        ({ type: 'profile/SET_USER_STATUS',  status} as const),

    savePhotoSuccess: (photos: UserPhotosType) =>
        ({ type: 'profile/SAVE_PHOTO_SUCCESS',  photos} as const),

    setIsLoadingStatus: (status: boolean) =>
        ({ type: 'profile/SET_IS_LOADING_STATUS',  status} as const),

    setIsLoadingProfileInfoChanges: (status: boolean) =>
        ({ type: 'profile/SET_IS_LOADING_PROFILE_INFO_CHANGES',  status} as const),

    setIsLoadingAvatar: (status: boolean) =>
        ({ type: 'profile/SET_IS_LOADING_AVATAR',  status} as const)
}
type ActionTypes = InferActionsTypes<typeof actions>




export const getUserProfile = (userId: number): BaseThunkType<ActionTypes> => {
    return async (dispatch) => {
        if(userId){
            const response = await profileAPI.getUsersProfile(userId)
            dispatch(actions.setUserProfile(response))
            await dispatch(getUserStatus(userId))
        }
    }
}



export const getUserStatus = (userId: number): BaseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actions.setIsLoadingStatus(true))
    dispatch(actions.setUserStatus(null))

    if(userId){
        const response = await profileAPI.getStatus(userId)
        dispatch(actions.setUserStatus(response))
        dispatch(actions.setIsLoadingStatus(false))
    }
}



export const updateUserStatus = (status: string | null): BaseThunkType<ActionTypes, string> => async (dispatch) => {
    dispatch(actions.setIsLoadingStatus(true))

    const response = await profileAPI.updateStatus(status)
    dispatch(actions.setIsLoadingStatus(false))
    if(response.data.resultCode === ResultCodesEnum.Success){
        dispatch(actions.setUserStatus(status))
        return Promise.resolve('Status updated')
    }else{
        return Promise.reject('Server error')
    }
}



export const savePhoto = (file: File): BaseThunkType<ActionTypes> => async (dispatch) => {
    dispatch(actions.setIsLoadingAvatar(true))
    const response = await profileAPI.savePhoto(file)
    dispatch(actions.setIsLoadingAvatar(false))

    if(response.resultCode === ResultCodesEnum.Success){
        dispatch(actions.savePhotoSuccess(response.data.photos))
    }
}



export const saveProfileInfo = (profileInfo: {
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string,
    contacts: UserContactsType
}): BaseThunkType<ActionTypes, string> => async (dispatch, getState) => {

    dispatch(actions.setIsLoadingProfileInfoChanges(true))

    const userId: number | null = await getState().auth.userId
    const response = await profileAPI.saveProfileInfo(profileInfo)

    dispatch(actions.setIsLoadingProfileInfoChanges(false))

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