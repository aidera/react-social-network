import Posts from './Posts'
import {addPost, deletePost, likePost, dislikePost} from '../../../redux/posts-reducer'
import {connect} from "react-redux"
import {getPosts,getLikedPosts} from "../../../redux/posts-selectors"
import {getIsAuth} from "../../../redux/auth-selectors"
import {AppStateType} from "../../../redux/redux-store"



type MapStateToProps = ReturnType<typeof mapStateToProps>

type MapDispatchToProps = {
    addPost: (newPost: string) => void
    deletePost: (postId: number) => void
    likePost:  (postId: number) => void
    dislikePost:  (postId: number) => void
}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: getPosts(state),
        likedPosts: getLikedPosts(state),
        isAuth: getIsAuth(state)
    }
}

const mapDispatchToProps: MapDispatchToProps = {
    addPost,
    deletePost,
    likePost,
    dislikePost
}



const PostsContainer = connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(Posts)



export default PostsContainer