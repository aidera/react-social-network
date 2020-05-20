import Posts from './Posts';
import {addPost, deletePost, likePost, dislikePost} from '../../../redux/posts-reducer'
import {connect} from "react-redux";
import {getPosts,getLikedPosts} from "../../../redux/posts-selectors";
import {getIsAuth} from "../../../redux/auth-selectors";


/* We need auth to show/hide such buttons like "delete post" and "like"/"dislike" */
let mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        likedPosts: getLikedPosts(state),
        isAuth: getIsAuth(state)
    }
}



const PostsContainer = connect(mapStateToProps, {addPost, deletePost, likePost, dislikePost})(Posts)

export default PostsContainer;