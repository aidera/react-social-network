import {checkAuth} from './auth-reducer'

const SET_INITIAL = 'app/SET_INITIAL';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIAL:
            return {
                ...state,
                initialized: true
            };

        default:
            return state;

    }
}

export const setInitial = () => ({ type: SET_INITIAL });

export const initializeApp = () => async (dispatch) => {
    await dispatch(checkAuth());
    dispatch(setInitial());
}

export default appReducer;