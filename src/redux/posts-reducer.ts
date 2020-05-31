import {PostType} from "../types/Post"
import {BaseThunkType, InferActionsTypes} from "./redux-store"





let initialState = {
    posts:[
        {id: 1, likesCount: 1, text: 'OOP Typically depends on shared state. Objects and behaviors are typically tacked together on the same entity, which may be accessed at random by any number of functions with non-deterministic order, which may lead to undesirable behavior such as race conditions.'},
        {id: 2, likesCount: 5, text: 'It’s easy to understand the basic concept of objects and easy to interpret the meaning of method calls. OOP tends to use an imperative style rather than a declarative style, which reads like a straight-forward set of instructions for the computer to follow.'},
        {id: 3, likesCount: 2, text: 'Using the functional paradigm, programmers avoid any shared state or side-effects, which eliminates bugs caused by multiple functions competing for the same resources. With features such as the availability of point-free style (aka tacit programming), functions tend to be radically simplified and easily recomposed for more generally reusable code compared to OOP.'},
        {id: 4, likesCount: 40, text: 'Over exploitation of FP features such as point-free style and large compositions can potentially reduce readability because the resulting code is often more abstractly specified, more terse, and less concrete.\n\n' +
                'More people are familiar with OO and imperative programming than functional programming, so even common idioms in functional programming can be confusing to new team members.'},
    ] as Array<PostType>,
    maxPostId: 4,
    likedPosts: [1,4] as Array<number>,
}
export type InitialStateType = typeof initialState





const postReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case 'posts/ADD-POST':
            return {
                ...state,
                posts: [...state.posts, {id: state.maxPostId+1, text: action.newPost,likesCount: 0}],
                maxPostId: state.maxPostId+1
            }

        case 'posts/DELETE_POST':
            let deletePostArr = [...state.posts]
            for(let i = 0; i < deletePostArr.length; i++){
                if(deletePostArr[i].id === action.postId){
                    deletePostArr.splice(i, 1)
                }
            }

            return {
                ...state,
                posts: deletePostArr
            }

        case 'posts/LIKE_POST':
            let isPostLiked = state.likedPosts.some((number) => number === action.postId)
            if(!isPostLiked){
                let newLikedPostsArr = state.likedPosts
                newLikedPostsArr.push(action.postId)
                let likePostsArr =  [...state.posts]
                for(let i = 0 ;i < likePostsArr.length; i++){
                    if(likePostsArr[i].id === action.postId){
                        likePostsArr[i].likesCount ++
                    }
                }

                return {
                    ...state,
                    likedPosts: newLikedPostsArr,
                    posts: likePostsArr
                }
            }
            return state

        case 'posts/DISLIKE_POST':
            let isPostLiked2 = state.likedPosts.some((number) => number === action.postId)
            if(isPostLiked2){
                let newLikedPostsArr = state.likedPosts.filter((number) => number !== action.postId)
                let dislikePostsArr =  [...state.posts]
                for(let i = 0; i < dislikePostsArr.length; i++){
                    if(dislikePostsArr[i].id === action.postId){
                        dislikePostsArr[i].likesCount --
                    }
                }
                return {
                    ...state,
                    likedPosts: newLikedPostsArr,
                    posts: dislikePostsArr
                }
            }
            return state


        default:
            return state

    }
}





export const actions = {
    addPostSuccess: (newPost: string) =>
        ({ type: 'posts/ADD-POST', newPost} as const),

    deletePostSuccess: (postId: number) =>
        ({ type: 'posts/DELETE_POST', postId} as const),

    likePostSuccess: (postId: number) =>
        ({ type: 'posts/LIKE_POST', postId} as const),

    dislikePostSuccess: (postId: number) =>
        ({ type: 'posts/DISLIKE_POST', postId} as const),
}
type ActionTypes = InferActionsTypes<typeof actions>





export const addPost = (newPost: string): BaseThunkType<ActionTypes> => async (dispatch) => {
    await dispatch(actions.addPostSuccess(newPost))
}



export const deletePost = (postId: number): BaseThunkType<ActionTypes> => async (dispatch) => {
    await dispatch(actions.deletePostSuccess(postId))
}



export const likePost = (postId: number): BaseThunkType<ActionTypes> => async (dispatch) => {
    await dispatch(actions.likePostSuccess(postId))
}



export const dislikePost = (postId: number): BaseThunkType<ActionTypes> => async (dispatch) => {
    await dispatch(actions.dislikePostSuccess(postId))
}





export default postReducer