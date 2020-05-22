import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_ADD_USERS = 'users/SET_ADD_USERS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_IS_LOADING = 'users/SET_IS_LOADING';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [],
    isLoading: true
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

        case SET_ADD_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.total
            };


        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.status
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
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setAddUsers = (users) => ({ type: SET_ADD_USERS, users });
export const setTotalUsersCount = (total) => ({ type: SET_TOTAL_USERS_COUNT, total });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setIsLoading = (status) => ({ type: SET_IS_LOADING, status });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });


export const requestUsers = (currentPage, onPageLimit) =>  {
    return async (dispatch) => {

        dispatch(setIsLoading(true));

        let data = await usersAPI.requestUsers(currentPage, onPageLimit);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));

        dispatch(setIsLoading(false));

    }
};

export const requestAddUsers = (currentPage, onPageLimit) =>  {
    return async (dispatch) => {

        dispatch(toggleIsFetching(true));

        let data = await usersAPI.requestUsers(currentPage, onPageLimit);
        dispatch(setAddUsers(data.items));

        dispatch(toggleIsFetching(false));

        return Promise.resolve(true)

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