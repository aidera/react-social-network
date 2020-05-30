import {ResultCodesEnum, usersAPI} from "../api/api"
import {updateObjectInArray} from "../utils/object-helpers"
import {UserTypeFromUsersPageApi} from "../types/User"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "./redux-store"
import {Dispatch} from "redux"



let initialState = {
    users: [] as Array<UserTypeFromUsersPageApi>,
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    isLoading: true
}

export type InitialStateType = typeof initialState



const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case 'users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case 'users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }

        case 'users/SET-USERS':
            return {
                ...state,
                users: action.users
            }

        case 'users/SET_ADD_USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        case 'users/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.total
            }


        case 'users/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }

        case 'users/SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.status
            }

        case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state

    }


}



type ActionTypes = InferActionsTypes<typeof actions>


export const actions = {
    followSuccess: (userId: number) =>
        ({ type: 'users/FOLLOW', userId: userId } as const),

    unfollowSuccess: (userId: number) =>
        ({ type: 'users/UNFOLLOW', userId: userId } as const),

    setUsers: (users: Array<UserTypeFromUsersPageApi>) =>
        ({ type: 'users/SET-USERS', users } as const),

    setAddUsers: (users: Array<UserTypeFromUsersPageApi>) =>
        ({ type: 'users/SET_ADD_USERS', users } as const),

    setTotalUsersCount: (total: number) =>
        ({ type: 'users/SET_TOTAL_USERS_COUNT', total } as const),

    toggleIsFetching: (isFetching: boolean) =>
        ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),

    setIsLoading: (status: boolean) =>
        ({ type: 'users/SET_IS_LOADING', status } as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)

}




type ThunkVoidType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkReturnType = ThunkAction<Promise<string>, AppStateType, unknown, ActionTypes>

export const requestUsers = (currentPage: number, onPageLimit: number): ThunkVoidType =>  {
    return async (dispatch) => {

        dispatch(actions.setIsLoading(true))

        let data = await usersAPI.requestUsers(currentPage, onPageLimit)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))

        dispatch(actions.setIsLoading(false))
    }
}

export const requestAddUsers = (currentPage: number, onPageLimit: number): ThunkReturnType =>  {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))

        let data = await usersAPI.requestUsers(currentPage, onPageLimit)
        dispatch(actions.setAddUsers(data.items))
        dispatch(actions.toggleIsFetching(false))
        return Promise.resolve('Get users')
    }
}


const followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>,
                                  userId: number,
                                  methodAPI: any,
                                  actionCreator: ActionTypes) => {

    dispatch(actions.toggleFollowingProgress(true, userId))

    const data = await methodAPI
    dispatch(actions.toggleFollowingProgress(false, userId))
    if(data.resultCode === ResultCodesEnum.Success){
        dispatch(actionCreator)
        return Promise.resolve('Followed / unfollowed')
    }else{
        return Promise.reject('Server error')
    }
}

export const follow = (userId: number): ThunkVoidType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow(userId), actions.followSuccess(userId))
    }
}

export const unfollow = (userId: number): ThunkVoidType =>  {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow(userId), actions.unfollowSuccess(userId))
    }
}



export default usersReducer