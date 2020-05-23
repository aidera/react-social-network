export const getMessages = (state) => {
    return state.dialogsPage.messages;
}

export const getDialogs = (state) => {
    return state.dialogsPage.dialogs;
}

export const getUsers = (state) => {
    return state.dialogsPage.users;
}

export const getIsMessageFetching = (state) => {
    return state.dialogsPage.isMessageFetching;
}
export const getIsMessagesLoading = (state) => {
    return state.dialogsPage.isMessagesLoading;
}