import {profileAPI} from '../api/api'
import {UserType} from "../types/User"
import {DialogType} from "../types/Dialog"
import {MessageType} from "../types/Message"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "./redux-store"



let initialState = {
    currentDialogId: null as number | null,
    currentUser: null as UserType | null,
    messages: [
        {id: 1, opponentId: 2, date: 1589972640000, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 2, opponentId: 2, date: 1589976600000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 3, opponentId: 2, date: 1589979600000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 4, opponentId: 2, date: 1589988360000, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},
        {id: 5, opponentId: 9, date: 1589988720000, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 6, opponentId: 11, date: 1589994180000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 7, opponentId: 11, date: 1589997480000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 8, opponentId: 12, date: 1589997840000, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, opponentId: 2},
        {id: 2, opponentId: 9},
        {id: 3, opponentId: 11},
        {id: 4, opponentId: 12}
    ] as Array<DialogType>,
    users: [] as Array<UserType>,  // collecting users from dialogs arr (that's why we dont need to get user again in Message and Dialog components)
    isMessageFetching: false,
    isMessagesLoading: false
}

export type InitialStateType = typeof initialState



const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case 'dialogs/SET_CURRENT_DIALOG_ID':
            return {
                ...state,
                currentDialogId: action.dialogId
            }

        case 'dialogs/SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.user
            }

        case 'dialogs/SEND-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    opponentId: action.userId,
                    date: action.date,
                    from: 'me',
                    messageText: action.newMessage,
                }]
            }

        case 'dialogs/SET_DIALOG':
            return {
                ...state,
                dialogs: [...state.dialogs, {
                    id: state.dialogs.length + 1,
                    opponentId: action.userId
                }]
            }

        case 'dialogs/SET_USER':
            return {
                ...state,
                users: [...state.users, action.user]
            }

        case 'dialogs/MESSAGE_IS_FETCHING':
            return {
                ...state,
                isMessageFetching: action.status
            }

        case 'dialogs/SET_IS_MESSAGES_LOADING':
            return {
                ...state,
                isMessagesLoading: action.status
            }

        default:
            return state

    }
}



type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    setCurrentDialogId: (dialogId: number | null) =>
        ({ type: 'dialogs/SET_CURRENT_DIALOG_ID', dialogId } as const),

    setCurrentUserSuccess: (user: UserType | null)=>
        ({ type: 'dialogs/SET_CURRENT_USER', user } as const),

    sendMessageSuccess: (userId: number, newMessage: string, date: number) =>
        ({ type: 'dialogs/SEND-MESSAGE', userId, newMessage, date } as const),

    setDialog: (userId: number) =>
        ({ type: 'dialogs/SET_DIALOG', userId } as const),

    setUsersSuccess: (user: UserType) =>
        ({ type: 'dialogs/SET_USER', user } as const),

    setIsMessageFetching: (status: boolean) =>
        ({ type: 'dialogs/MESSAGE_IS_FETCHING', status } as const),

    setIsMessagesLoading: (status: boolean) =>
        ({ type: 'dialogs/SET_IS_MESSAGES_LOADING', status } as const)
}





type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkBooleanType = ThunkAction<Promise<boolean>, AppStateType, unknown, ActionTypes>

export const setUser = (userId: number): ThunkType => async (dispatch) => {
    if(userId){
        try{
            const response = await profileAPI.getUsersProfile(userId)
            dispatch(actions.setUsersSuccess(response))
        }catch{
            console.log('No such user')
        }
    }
}

export const checkUser = (userId: number): ThunkBooleanType => async () => {
    try{
        await profileAPI.getUsersProfile(userId)
        return true
    }catch{
        return false
    }
}

export const setCurrentUser = (userId: number | null): ThunkType => async (dispatch) => {
    dispatch(actions.setIsMessagesLoading(true))
    if(userId){
        try{
            const response = await profileAPI.getUsersProfile(userId)
            if(response.userId){
                dispatch(actions.setCurrentUserSuccess(response))
            }
        }catch{
            dispatch(actions.setCurrentUserSuccess(null))
        }

    }else{
        dispatch(actions.setCurrentUserSuccess(null))
    }

    dispatch(actions.setIsMessagesLoading(false))
}

export const sendMessage = (userId: number, newMessage: string, date: number): ThunkType => async (dispatch, getState) => {
    const state = getState()
    const dialogs = state.dialogsPage.dialogs

    dispatch(actions.setIsMessageFetching(true))
    let isNewDialog = true
    dialogs.forEach((dialog: DialogType) => {
        if(dialog.opponentId === userId){
            isNewDialog = false
        }
    })
    if(isNewDialog){
        await profileAPI.getUsersProfile(userId)
        dispatch(actions.setDialog(userId))
    }
    dispatch(actions.sendMessageSuccess(userId, newMessage, date))
    dispatch(actions.setIsMessageFetching(false))

}



export default dialogsReducer