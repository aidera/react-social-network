const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts:[
        {id: 1, likesCount: 1, text: 'Lorem ipsum dolor sit.'},
        {id: 2, likesCount: 5, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam!'},
        {id: 3, likesCount: 2, text: 'Lorem ipsum dolor sit amet'},
        {id: 4, likesCount: 40, text: 'Jetxc jjsd ddffddf'},
    ],
    postWritingText: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let text = state.postWritingText;
            return {
                ...state,
                postWritingText: '',
                posts: [...state.posts, {id: 5,text: text,likesCount: 0}]
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                postWritingText: action.newText.replace(/[^-0-9A-zА-я ]/gim,'')
            };

        default:
            return state;

    }
}

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => 
    ({ type: UPDATE_NEW_POST_TEXT,  newText: text});

export default profileReducer;