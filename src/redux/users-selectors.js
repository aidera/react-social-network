// import {createSelector} from 'reselect';

export const getUsers = (state) => {
    return state.usersPage.users;
}



export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getPagesCount = (state) => {
    return state.usersPage.pagesCount;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}


// export const getUsersSelector = createSelector(getUsers, (users) => {
//     return users.filter(u => true);
// })
//
// export const getUsersSelectorMultiply = createSelector(getUsers, getPageSize, (users,limit) => {
//     return '...';
// })