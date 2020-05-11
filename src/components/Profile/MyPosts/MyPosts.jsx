import React from 'react';
import s from './MyPosts.module.sass';
import Post from './Post/Post';




function MyPosts(props) {


    let addPost = () => {
        props.addPost();
    }

    let postWriting = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.posts}>
            <h1>My Posts</h1>
            <div className={s.newPost}>

                <textarea 
                    onChange={ postWriting } 
                    value={props.postWritingText}
                />

                <button 
                    onClick={ addPost }
                >Add post</button>

            </div>
            <div>
                { props.posts.map( post => (
                    <Post key={post.id} postID={post.id} likesCount={post.likesCount}>{post.text}</Post>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;