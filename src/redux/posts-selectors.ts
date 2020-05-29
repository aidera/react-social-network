import {AppStateType} from "./redux-store";

export const getPosts = (state: AppStateType) => {
    let posts = [...state.postsPage.posts];
    posts = posts.reverse();
    posts.map(post => {
        return post.text = post.text.replace(/(?:\r\n|\r|\n)/g, '<br />')
    })
    return posts;
}

export const getLikedPosts = (state: AppStateType) => {
    return state.postsPage.likedPosts;
}
