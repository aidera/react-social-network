import MyPosts from './MyPosts';
import {addPost} from '../../../redux/profile-reducer'
import {connect} from "react-redux";
import {getPosts} from "../../../redux/profile-selectors";



let mapStateToProps = (state) => {
    return {
        posts: getPosts(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {
            dispatch(addPost(newPost));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;