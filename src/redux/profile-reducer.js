import {profileAPI} from "../api/api";


const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'profile/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const SET_IS_LOADING_STATUS = 'profile/SET_IS_LOADING_STATUS';
const SET_IS_LOADING_AVATAR = 'profile/SET_IS_LOADING_AVATAR';
const SET_IS_LOADING_PROFILE_INFO_CHANGES = 'profile/SET_IS_LOADING_PROFILE_INFO_CHANGES';



let initialState = {
    profile: null,
    isLoadingAvatar: false,
    isLoadingProfileInfoChanges: false,
    status: '',
    isLoadingStatus: false,

};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {

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

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };

        case SET_IS_LOADING_STATUS:
            return {
                ...state,
                isLoadingStatus: action.status
            };

        case SET_IS_LOADING_PROFILE_INFO_CHANGES:
            return {
                ...state,
                isLoadingProfileInfoChanges: action.status
            };

        case SET_IS_LOADING_AVATAR:
            return {
                ...state,
                isLoadingAvatar: action.status
            };

        default:
            return state;

    }
}

export const setUserProfile = (profile) =>({ type: SET_USER_PROFILE,  profile});
export const setUserStatus = (status) =>({ type: SET_USER_STATUS,  status});
export const savePhotoSuccess = (photos) =>({ type: SAVE_PHOTO_SUCCESS,  photos});
export const setIsLoadingStatus = (status) =>({ type: SET_IS_LOADING_STATUS,  status});
export const setIsLoadingProfileInfoChanges = (status) =>({ type: SET_IS_LOADING_PROFILE_INFO_CHANGES,  status});
export const setIsLoadingAvatar = (status) =>({ type: SET_IS_LOADING_AVATAR,  status});



export const getUserProfile = (userId) =>  {
    return async (dispatch) => {

        dispatch(setUserProfile(null));

        if(userId){

            await profileAPI.getUsersProfile(userId)
                .then(async (response) => {
                    dispatch(setUserProfile(response));
                    dispatch(getUserStatus(userId));
                    return Promise.resolve(null);
                })
                .catch((error) => {
                    dispatch(setUserProfile(undefined));
                    // return Promise.reject(error)
                })

        }

    }
};

export const getUserStatus = (userId) => async (dispatch) => {

    dispatch(setUserStatus(''));

    if(userId){
        try{
            const response = await profileAPI.getStatus(userId);
            dispatch(setUserStatus(response));
        }catch(error){
            return Promise.reject('No such user or server error');
        }

    }
};

export const updateUserStatus = (status) => async (dispatch) => {
    dispatch(setIsLoadingStatus(true));

    const response = await profileAPI.updateStatus(status);
    dispatch(setIsLoadingStatus(false));
    if(response.data.resultCode === 0){
        dispatch(setUserStatus(status));
        return Promise.resolve(null);
    }else{
        if(response.data){
            return Promise.reject(response.data.messages[0]);
        }else{
            return Promise.reject('Server error');
        }
    }



};

export const savePhoto = (file) => async (dispatch) => {

    dispatch(setIsLoadingAvatar(true));
    const response = await profileAPI.savePhoto(file);
    dispatch(setIsLoadingAvatar(false));

    if(response.data.resultCode === 0){
        dispatch(savePhotoSuccess(response.data.data.photos));
        return Promise.resolve(null);
    }else{
        if(response.data){
            return Promise.reject(response.data.messages[0]);
        }else{
            return Promise.reject('Server error');
        }
    }
};

export const saveProfileInfo = (profile) => async (dispatch, getState) => {

    dispatch(setIsLoadingProfileInfoChanges(true));

    const userId = await getState().auth.userId;
    const response = await profileAPI.saveProfileInfo(profile);

    dispatch(setIsLoadingProfileInfoChanges(false));

    if(response.data.resultCode === 0){
        await dispatch(getUserProfile(userId));
        return Promise.resolve(null);
    }else{
        if(response.data){
            return Promise.reject(response.data.messages[0]);
        }else{
            return Promise.reject('Server error');
        }
    }

};


export default profileReducer;