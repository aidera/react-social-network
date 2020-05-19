import React, {useState} from 'react';
import s from './Posts.module.sass';
import Post from './Post/Post';
import cn from 'classnames';
import {Form, Formik} from "formik";
import {CustomField} from "../../common/FormsControls/CustomFormControls";
import Modal from '../../common/Modal/Modal'





const Posts = React.memo(({
                                        posts,
                                        addPost,
                                        deletePost,
                                        likePost,
                                        dislikePost,
                                        likedPosts,
                                        userPhoto,
                                        isOwner,
                                        isAuth,
                                        ...props}) => {


    let [isModalDeletePostOpen, setIsModalDeletePostOpen] = useState(false);
    let [isModalLikePostOpen, setIsModalLikePostOpen] = useState(false);
    let [modalElementId, setModalElementId] = useState(null);


    const modalCallDeletePost = (id) => {
        setIsModalDeletePostOpen(true);
        setModalElementId(id);
    }

    const modalCallbackDeletePostResolve = () => {
        return new Promise((resolve, reject) => {
            deletePost(modalElementId);
            return resolve(null)
        })
    }

    const modalCallLikePost = () => {
        setIsModalLikePostOpen(true);
    }

    const modalCallbackLikePostResolve = () => {
        window.location.href = "/login";
    }


    return (
        <div className={s.posts}>

            {isModalDeletePostOpen &&
                <Modal
                    text={'Are you sure you want to delete this post?'}
                    buttonSuccessText={'Yes'}
                    buttonRejectText={'No'}
                    callbackResolve={modalCallbackDeletePostResolve}
                    isOpen={isModalDeletePostOpen}
                    setIsOpen={setIsModalDeletePostOpen}
                />
            }

            {isModalLikePostOpen &&
                <Modal
                    text={'To like this post you need to authorize. Want you go to login page?'}
                    buttonSuccessText={'Yes'}
                    buttonRejectText={'No'}
                    callbackResolve={modalCallbackLikePostResolve}
                    isOpen={isModalLikePostOpen}
                    setIsOpen={setIsModalLikePostOpen}
                />
            }


            <h2>{isOwner ? 'My Posts' : 'Posts'}</h2>
            <div className={s.newPost}>

                {isOwner &&
                <Formik
                    initialValues={{
                        post: ''
                    }}
                    onSubmit={(values, actions) =>  {

                        if(values.post.length > 0){

                            addPost(values.post);
                            actions.resetForm();
                            // actions.setFieldError('post', error);

                        }

                    }}
                >{formik => {
                    return(
                        <Form>

                            <CustomField
                                fieldType={'textarea'}
                                name={'post'}
                                placeholder={'Type something clever :)'}
                            />
                            {formik.values.post.length > 0 &&
                            <button type='submit' className={cn('button', 'button-success')}>Add post</button>
                            }

                        </Form>
                    )
                }}

                </Formik>
                }

            </div>
            <div>
                { posts.map( post => (
                    <Post
                        isOwner={isOwner}
                        key={post.id}
                        postID={post.id}
                        likesCount={post.likesCount}
                        userPhoto={userPhoto}
                        modalCallDeletePost={modalCallDeletePost}
                        modalCallLikePost={modalCallLikePost}
                        likePost={likePost}
                        dislikePost={dislikePost}
                        liked={likedPosts.some((number) => number === post.id)}
                        isAuth={isAuth}
                    >
                        {post.text}</Post>
                ))}
            </div>
        </div>
    );
})







export default Posts;