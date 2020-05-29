import {AppStateType} from "./redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

export const getIsLoadingStatus = (state: AppStateType) => {
    return state.profilePage.isLoadingStatus;
}
export const getLoadingProfileInfoChanges = (state: AppStateType) => {
    return state.profilePage.isLoadingProfileInfoChanges;
}

export const getIsLoadingAvatar = (state: AppStateType) => {
    return state.profilePage.isLoadingAvatar;
}