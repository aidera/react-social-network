import MyPosts from './MyPosts';
import {addPostActionCreator,updateNewPostTextActionCreator} from '../../../redux/profile-reducer'
import {connect} from "react-redux";



let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        postWritingText: state.profilePage.postWritingText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text));
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;