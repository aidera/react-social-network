import {AppStateType} from "./redux-store";

export const getCurrentDialogId = (state: AppStateType) => {
    return state.dialogsPage.currentDialogId;
}

export const getCurrentUser = (state: AppStateType) => {
    return state.dialogsPage.currentUser;
}

export const getMessages = (state: AppStateType) => {
    return state.dialogsPage.messages;
}

export const getDialogs = (state: AppStateType) => {
    return state.dialogsPage.dialogs;
}

export const getUsers = (state: AppStateType) => {
    return state.dialogsPage.users;
}

export const getIsMessageFetching = (state: AppStateType) => {
    return state.dialogsPage.isMessageFetching;
}
export const getIsMessagesLoading = (state: AppStateType) => {
    return state.dialogsPage.isMessagesLoading;
}