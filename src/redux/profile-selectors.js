export const getProfile = (state) => {
    return state.profilePage.profile;
}

export const getStatus = (state) => {
    return state.profilePage.status;
}

export const getIsLoadingStatus = (state) => {
    return state.profilePage.isLoadingStatus;
}
export const getLoadingProfileInfoChanges = (state) => {
    return state.profilePage.isLoadingProfileInfoChanges;
}

export const getIsLoadingAvatar = (state) => {
    return state.profilePage.isLoadingAvatar;
}