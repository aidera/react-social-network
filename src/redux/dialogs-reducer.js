import {profileAPI} from '../api/api'

const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';
const SET_USER = 'dialogs/SET_USER';



let initialState = {
    messages: [
        {id: 1, dialogId: 2, time:1589972640000, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 2, dialogId: 2, time:1589976600000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 3, dialogId: 2, time:1589979600000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 4, dialogId: 2, time:1589988360000, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},
        {id: 5, dialogId: 9, time:1589988720000, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 6, dialogId: 11, time:1589994180000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 7, dialogId: 11, time:1589997480000, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 8, dialogId: 12, time:1589997840000, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},

    ],
    dialogs: [
        {id: 1, opponentId: 2},
        {id: 2, opponentId: 9},
        {id: 3, opponentId: 11},
        {id: 4, opponentId: 12}
    ],
    users: [],
    maxMessages:8,
};


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.maxMessages + 1,
                    dialogId: action.dialogId,
                    time: action.time,
                    from: 'me',
                    messageText: action.newMessage,
                }],
                maxMessages: state.maxMessages + 1
            }

        case SET_USER:
            return {
                ...state,
                users: [...state.users, action.userId]
            }

        default:
            return state;

    }
}


export const sendMessage = (dialogId, newMessage, time) => ({ type: SEND_MESSAGE, dialogId, newMessage, time });
export const setUser = (userId) => ({ type: SET_USER, userId });


export const getUserFromServer = (userId) => (dispatch) => {
    profileAPI.getUsersProfile(userId).then((response) => {
        dispatch(setUser(response));
    })

}


export default dialogsReducer;