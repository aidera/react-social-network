import {profileAPI} from "../api/api";


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';


let initialState = {
    posts:[
        {id: 1, likesCount: 1, text: 'Lorem ipsum dolor sit.'},
        {id: 2, likesCount: 5, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam!'},
        {id: 3, likesCount: 2, text: 'Lorem ipsum dolor sit amet'},
        {id: 4, likesCount: 40, text: 'Jetxc jjsd ddffddf'},
    ],
    profile: null,
    status: ''
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5,text: action.newPost,likesCount: 0}]
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            };


        default:
            return state;

    }
}


export const addPost = (newPost) => ({ type: ADD_POST, newPost});
export const setUserProfile = (profile) =>({ type: SET_USER_PROFILE,  profile});
export const setUserStatus = (status) =>({ type: SET_USER_STATUS,  status});

export const getUserProfile = (userId) =>  {
    return async (dispatch) => {
        dispatch(setUserProfile(null));

        const responseForGetUsers = await profileAPI.getUsersProfile(userId);
        dispatch(setUserProfile(responseForGetUsers));

        const responseForGetStatus = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(responseForGetStatus));
    }
};

export const getUserStatus = (userId) => async (dispatch) => {
    dispatch(setUserStatus(''));

    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response));
};

export const updateUserStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if(response.data.resultCode === 0){
        dispatch(setUserStatus(status));
    }
};


export default profileReducer;