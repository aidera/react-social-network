import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import navbarReducer from './navbar-reducer';


let store = {

    _state: {
        profilePage: {
            posts:[
                {id: 1, likesCount: 1, text: 'Lorem ipsum dolor sit.'},
                {id: 2, likesCount: 5, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam!'},
                {id: 3, likesCount: 2, text: 'Lorem ipsum dolor sit amet'},
                {id: 4, likesCount: 40, text: 'Jetxc jjsd ddffddf'},
            ],
            postWritingText: ''
            
        },
        dialogsPage: {
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
        },
        navbar: {
            friends: [
                {id: 1, name:'Andrew', avatar:'ava4.jpg'},
                {id: 2, name:'Sasha', avatar:'ava3.jpg'},
                {id: 3, name:'Sveta', avatar:'ava2.jpg'},
            ]
        } 
    },


    _callSubscriber(){
        console.log('no observers');
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },





    getState() {
        return this._state
    },




    dispatch(action) {

        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);

        this._callSubscriber(this._state);

        
    },





}



export default store;