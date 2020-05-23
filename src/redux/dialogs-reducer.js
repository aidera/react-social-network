import {profileAPI} from '../api/api'

const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';
const SET_DIALOG = 'dialogs/SET_DIALOG';
const SET_USER = 'dialogs/SET_USER';
const SET_IS_MESSAGE_FETCHING = 'dialogs/MESSAGE_IS_FETCHING';
const SET_IS_MESSAGES_LOADING = 'dialogs/SET_IS_MESSAGES_LOADING';



let initialState = {
    messages: [
        {id: 1, opponentId: 2, time:1589972640000, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 2, opponentId: 2, time:1589976600000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 3, opponentId: 2, time:1589979600000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 4, opponentId: 2, time:1589988360000, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},
        {id: 5, opponentId: 9, time:1589988720000, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 6, opponentId: 11, time:1589994180000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 7, opponentId: 11, time:1589997480000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 8, opponentId: 12, time:1589997840000, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},

    ],
    dialogs: [
        {id: 1, opponentId: 2},
        {id: 2, opponentId: 9},
        {id: 3, opponentId: 11},
        {id: 4, opponentId: 12}
    ],
    users: [],  // collecting users from dialogs arr (that's why we dont need to get user again in Message and Dialog components)
    isMessageFetching: false,
    isMessagesLoading: false
};


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    opponentId: action.userId,
                    time: action.time,
                    from: 'me',
                    messageText: action.newMessage,
                }],
                maxMessages: state.maxMessages + 1
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
                users: [...state.users, action.userId]
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


export const sendMessageSuccess = (userId, newMessage, time) => ({ type: SEND_MESSAGE, userId, newMessage, time });
export const setDialog = (userId) => ({ type: SET_DIALOG, userId });
export const setUserSuccess = (userId) => ({ type: SET_USER, userId });
export const setIsMessageFetching = (status) => ({ type: SET_IS_MESSAGE_FETCHING, status });
export const setIsMessagesLoading = (status) => ({ type: SET_IS_MESSAGES_LOADING, status });



export const setUser = (userId) => (dispatch) => {
    return profileAPI.getUsersProfile(userId)
        .then((response) => {
            dispatch(setUserSuccess(response));
            return response
        })
}

export const getUserFromServer = (userId) => (dispatch) => {
    dispatch(setIsMessagesLoading(true));
    return profileAPI.getUsersProfile(userId)
        .then((response)=>{
            return response
        })
        .finally(() => {
            dispatch(setIsMessagesLoading(false));
        })
}


export const sendMessage = (userId, newMessage, time) => (dispatch, getState) => {

    const state = getState();
    const dialogs = state.dialogsPage.dialogs;

    dispatch(setIsMessageFetching(true));


    let isNewDialog = true;
    dialogs.forEach((dialog) => {
        if(dialog.opponentId === userId){
            isNewDialog = false;
        }
    })
    if(isNewDialog === true){
        return profileAPI.getUsersProfile(userId)
            .then(() => {
                dispatch(setDialog(userId));
                dispatch(sendMessageSuccess(userId, newMessage, time));
                return true
            })
            .catch(() => {
                return false
            })
            .finally(() => {
                dispatch(setIsMessageFetching(false));
            })

    }else{
        dispatch(sendMessageSuccess(userId, newMessage, time));
        dispatch(setIsMessageFetching(false));
        return true
    }



}


export default dialogsReducer;