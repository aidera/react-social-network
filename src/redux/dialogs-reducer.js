const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';


let initialState = {
    messages: [
        {id: 1, from: 'me', messageText:'Lorem ipsum dolor sit amet.'},
        {id: 2, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, veritatis.'},
        {id: 3, from: 'opponent', messageText:'Lorem ipsum, dolor sit amet consectetur adipisicing.'},
        {id: 4, from: 'me', messageText:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempora iste voluptatum veritatis eos quo, esse qui ipsam odio! Dicta?'},
    ],
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
                    messageText: action.newMessage,
                    from: 'me'
                }],
            }

        default:
            return state;

    }
}


export const sendMessageActionCreator = (newMessage) => ({ type: SEND_MESSAGE, newMessage });


export default dialogsReducer;