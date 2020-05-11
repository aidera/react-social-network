import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_PAGES_COUNT = 'users/SET_PAGES_COUNT';
const SET_USERS_TOTAL_COUNT = 'users/SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    pagesCount: 0,
    isFetching: false,
    followingInProgress: []
};


const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };

        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_PAGES_COUNT:
            return {
                ...state,
                pagesCount: action.pages
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            };

        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            };

        default:
            return state;

    }


}


export const followSuccess = (userId) => ({ type: FOLLOW, userId: userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId: userId });
export const setUsers = (users) => ({ type: SET_USERS, users: users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setPagesCount = (pages) => ({ type: SET_PAGES_COUNT, pages });
export const setUsersTotalCount = (totalCount) => ({ type: SET_USERS_TOTAL_COUNT, totalCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });


export const requestUsers = (page, pageSize) =>  {
    return async (dispatch) => {

        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.requestUsers(page, pageSize);
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
        dispatch(setPagesCount(Math.ceil(data.totalCount / pageSize)));
        dispatch(toggleIsFetching(false));
    }
};

const followUnfollowFlow = async (dispatch, userId, methodAPI, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))

    const data = await methodAPI;

    if(data.resultCode === 0){
        dispatch(actionCreator);
        dispatch(toggleFollowingProgress(false, userId))
    }
}

export const follow = (userId) =>  {
    return (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess(userId));
    }
};

export const unfollow = (userId) =>  {
    return (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow(userId), unfollowSuccess(userId));
    }
};



export default usersReducer;