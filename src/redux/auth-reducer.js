const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_PAGES_COUNT = 'SET_PAGES_COUNT';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHNG = 'TOGGLE_IS_FETCHNG';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    pagesCount: 0,
    isFetching: false,
};


const usersReducer = (state = initialState, action) => {


    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId ) {
                        return {
                            ...user,
                            followed: true
                        };

                    }
                    return user;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId ) {
                        return {
                            ...user,
                            followed: false
                        };
                    }
                    return user;
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_PAGES_COUNT:
            return {
                ...state,
                pagesCount: action.pages
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            };

        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };

        case TOGGLE_IS_FETCHNG:
            return {
                ...state,
                isFetching: action.isFetching
            };

        default:
            return state;

    }


}

export const follow = (userId) => ({ type: FOLLOW, userId: userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId: userId });
export const setUsers = (users) => ({ type: SET_USERS, users: users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setPagesCount = (pages) => ({ type: SET_PAGES_COUNT, pages });
export const setUsersTotalCount = (totalCount) => ({ type: SET_USERS_TOTAL_COUNT, totalCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHNG, isFetching });


export default usersReducer;