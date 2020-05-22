export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

export const getIsLoading= (state) => {
    return state.usersPage.isLoading;
}