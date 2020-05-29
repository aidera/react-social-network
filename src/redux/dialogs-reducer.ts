import {profileAPI} from '../api/api'
import {UserType} from "../types/User"
import {DialogType} from "../types/Dialog"
import {MessageType} from "../types/Message"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"



const SET_CURRENT_DIALOG_ID = 'dialogs/SET_CURRENT_DIALOG_ID'
const SET_CURRENT_USER = 'dialogs/SET_CURRENT_USER'
const SEND_MESSAGE = 'dialogs/SEND-MESSAGE'
const SET_DIALOG = 'dialogs/SET_DIALOG'
const SET_USER = 'dialogs/SET_USER'
const SET_IS_MESSAGE_FETCHING = 'dialogs/MESSAGE_IS_FETCHING'
const SET_IS_MESSAGES_LOADING = 'dialogs/SET_IS_MESSAGES_LOADING'



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

        case SET_CURRENT_DIALOG_ID:
            return {
                ...state,
                currentDialogId: action.dialogId
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.user
            }

        case SEND_MESSAGE:
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

        case SET_DIALOG:
            return {
                ...state,
                dialogs: [...state.dialogs, {
                    id: state.dialogs.length + 1,
                    opponentId: action.userId
                }]
            }

        case SET_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            }

        case SET_IS_MESSAGE_FETCHING:
            return {
                ...state,
                isMessageFetching: action.status
            }

        case SET_IS_MESSAGES_LOADING:
            return {
                ...state,
                isMessagesLoading: action.status
            }

        default:
            return state;

    }
}



type ActionTypes =
    SendMessageSuccessActionType |
    SetDialogActionType |
    SetUserSuccessActionType |
    SetIsMessageFetchingActionType |
    SetIsMessagesLoadingActionType |
    SetCurrentDialogIdType |
    SetCurrentUserSuccessType

export type SetCurrentDialogIdType = {
    type: typeof SET_CURRENT_DIALOG_ID
    dialogId: number | null
}
export const setCurrentDialogId = (dialogId: number | null): SetCurrentDialogIdType => ({ type: SET_CURRENT_DIALOG_ID, dialogId });

export type SetCurrentUserSuccessType = {
    type: typeof SET_CURRENT_USER
    user: UserType | null
}
export const setCurrentUserSuccess = (user: UserType | null): SetCurrentUserSuccessType => ({ type: SET_CURRENT_USER, user });

export type SendMessageSuccessActionType = {
    type: typeof SEND_MESSAGE
    userId: number
    newMessage: string
    date: number
}
export const sendMessageSuccess = (userId: number, newMessage: string, date: number): SendMessageSuccessActionType => ({ type: SEND_MESSAGE, userId, newMessage, date });

type SetDialogActionType = {
    type: typeof SET_DIALOG
    userId: number
}
export const setDialog = (userId: number): SetDialogActionType => ({ type: SET_DIALOG, userId });

type SetUserSuccessActionType = {
    type: typeof SET_USER
    user: UserType
}
export const setUsersSuccess = (user: UserType): SetUserSuccessActionType => ({ type: SET_USER, user });

type SetIsMessageFetchingActionType = {
    type: typeof SET_IS_MESSAGE_FETCHING
    status: boolean
}
export const setIsMessageFetching = (status: boolean): SetIsMessageFetchingActionType => ({ type: SET_IS_MESSAGE_FETCHING, status });

type SetIsMessagesLoadingActionType = {
    type: typeof SET_IS_MESSAGES_LOADING
    status: boolean
}
export const setIsMessagesLoading = (status: boolean): SetIsMessagesLoadingActionType => ({ type: SET_IS_MESSAGES_LOADING, status });



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const setUser = (userId: number): ThunkType => async (dispatch) => {
    if(userId){
        const response = await profileAPI.getUsersProfile(userId)
        dispatch(setUsersSuccess(response));
    }
}

export const setCurrentUser = (userId: number | null): ThunkType => async (dispatch) => {
    dispatch(setIsMessagesLoading(true));
    if(userId){
        const response = await profileAPI.getUsersProfile(userId)
        dispatch(setCurrentUserSuccess(response))
    }else{
        dispatch(setCurrentUserSuccess(null))
    }

    dispatch(setIsMessagesLoading(false));
}

export const sendMessage = (userId: number, newMessage: string, date: number): ThunkType => async (dispatch, getState) => {
    const state = getState();
    const dialogs = state.dialogsPage.dialogs;

    dispatch(setIsMessageFetching(true));
    let isNewDialog = true;
    dialogs.forEach((dialog: DialogType) => {
        if(dialog.opponentId === userId){
            isNewDialog = false;
        }
    })
    if(isNewDialog){
        await profileAPI.getUsersProfile(userId)
        dispatch(setDialog(userId));

    }
    dispatch(sendMessageSuccess(userId, newMessage, date));
    dispatch(setIsMessageFetching(false));

}



export default dialogsReducer;