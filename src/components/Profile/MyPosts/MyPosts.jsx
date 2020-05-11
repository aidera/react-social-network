import React from 'react';
import s from './MyPosts.module.sass';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


const maxLength10 = maxLengthCreator(10);

const MyPostForm = React.memo(({handleSubmit, ...props}) => {
    return (
        <form onSubmit={handleSubmit}>

            <Field
                name={'myPostTextarea'}
                component={Textarea}
                placeholder={'Type something clever :)'}
                validate={[required, maxLength10]}
            />
            <button>Add post</button>

        </form>
    );
})

const MyPostFormRedux = reduxForm({form:'myPostForm'})(MyPostForm)




const MyPosts = React.memo(({posts, addPost, ...props}) => {


    let onAddPost = (values) => {
        addPost(values.myPostTextarea);
    }



    return (
        <div className={s.posts}>
            <h1>My Posts</h1>
            <div className={s.newPost}>

            <MyPostFormRedux
                onSubmit={onAddPost}
            />

            </div>
            <div>
                { posts.map( post => (
                    <Post
                        key={post.id}
                        postID={post.id}
                        likesCount={post.likesCount}
                    >
                        {post.text}</Post>
                ))}
            </div>
        </div>
    );
})







export default MyPosts;