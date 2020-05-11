const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    messages: [
        {id: 1, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 2, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 3, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 4, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},
    ],
    messageWritingText: '',
    dialogs: [
        {id: 1, name: 'Loe'},
        {id: 2, name: 'Joe'},
        {id: 3, name: 'Carlos'},
        {id: 4, name: 'Jeniffer'}
    ]
};

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: 5,
                    messageText: state.messageWritingText,
                    from: 'me'
                }],
                messageWritingText: ''
            }


        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                messageWritingText: action.newText.replace(/[^-0-9A-zА-я ]/gim,'')
            };

        default:
            return state;

    }

    
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageTextActionCreator = (text) => 
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default dialogsReducer;