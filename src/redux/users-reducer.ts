import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserTypeFromUsersPageApi} from "../types/User";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";



const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_ADD_USERS = 'users/SET_ADD_USERS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_IS_LOADING = 'users/SET_IS_LOADING';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users: [] as Array<UserTypeFromUsersPageApi>,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    isLoading: true
};

export type InitialStateType = typeof initialState



const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
                    : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;

    }


}



type ActionTypes = FollowSuccessActionType |
    UnfollowSuccessActionType |
    SetUsersActionType |
    SetAddUsersActionType |
    SetTotalUsersCountActionType |
    ToggleIsFetchingActionType |
    SetIsLoadingActionType |
    ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId: userId });

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId: userId });

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserTypeFromUsersPageApi>
}
export const setUsers = (users: Array<UserTypeFromUsersPageApi>): SetUsersActionType => ({ type: SET_USERS, users });

type SetAddUsersActionType = {
    type: typeof SET_ADD_USERS
    users: Array<UserTypeFromUsersPageApi>
}
export const setAddUsers = (users: Array<UserTypeFromUsersPageApi>): SetAddUsersActionType => ({ type: SET_ADD_USERS, users });

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    total: number
}
export const setTotalUsersCount = (total: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, total });

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });

type SetIsLoadingActionType = {
    type: typeof SET_IS_LOADING
    status: boolean
}
export const setIsLoading = (status: boolean): SetIsLoadingActionType => ({ type: SET_IS_LOADING, status });

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });



type ThunkVoidType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkReturnType = ThunkAction<Promise<string>, AppStateType, unknown, ActionTypes>

export const requestUsers = (currentPage: number, onPageLimit: number): ThunkVoidType =>  {
    return async (dispatch) => {

        dispatch(setIsLoading(true));

        let data = await usersAPI.requestUsers(currentPage, onPageLimit);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));

        dispatch(setIsLoading(false));
    }
};

export const requestAddUsers = (currentPage: number, onPageLimit: number): ThunkReturnType =>  {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.requestUsers(currentPage, onPageLimit);
        dispatch(setAddUsers(data.items));
        dispatch(toggleIsFetching(false));
        return Promise.resolve('Get users')
    }
};


const followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>,
                                  userId: number,
                                  methodAPI: any,
                                  actionCreator: FollowSuccessActionType | UnfollowSuccessActionType) => {

    dispatch(toggleFollowingProgress(true, userId))

    const data = await methodAPI;
    dispatch(toggleFollowingProgress(false, userId))
    if(data.resultCode === 0){
        dispatch(actionCreator);
        return Promise.resolve('Followed / unfollowed')
    }else{
        return Promise.reject('Server error')
    }
}

export const follow = (userId: number): ThunkVoidType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), followSuccess(userId));
    }
};

export const unfollow = (userId: number): ThunkVoidType =>  {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow(userId), unfollowSuccess(userId));
    }
};



export default usersReducer;