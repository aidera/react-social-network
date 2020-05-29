import React, {useState} from 'react'
import s from './Posts.module.sass'
import Post from './Post/Post'
import cn from 'classnames'
import {Form, Formik} from "formik"
import {CustomField} from "../../common/FormsControls/CustomFormControls"
import Modal from '../../common/Modal/Modal'
import {PostType} from "../../../types/Post"



type PropsType = {
    posts: Array<PostType>
    addPost: (newPost: string) => void
    deletePost: (postId: number) => void
    likePost: (postId: number) => void
    dislikePost: (postId: number) => void
    likedPosts: Array<number>
    userPhoto: string | null
    isOwner: boolean
    isAuth: boolean
}

const Posts: React.FC<PropsType> = React.memo(({
                                        posts,
                                        addPost,
                                        deletePost,
                                        likePost,
                                        dislikePost,
                                        likedPosts,
                                        userPhoto, // Comes from Profile component
                                        isOwner,
                                        isAuth}) => {


    let [isModalDeletePostOpen, setIsModalDeletePostOpen] = useState(false)
    let [isModalLikePostOpen, setIsModalLikePostOpen] = useState(false)
    let [modalElementId, setModalElementId] = useState<number | undefined>(undefined)

    const modalCallDeletePost = (id: number) => {
        setIsModalDeletePostOpen(true)
        setModalElementId(id)
    }

    const modalCallbackDeletePostResolve = () => {
        if(modalElementId){
            deletePost(modalElementId)
        }
    }

    const modalCallLikePost = () => {
        setIsModalLikePostOpen(true)
    }

    const modalCallbackLikePostResolve = () => {
        window.location.href = "/login"
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
                                addPost(values.post)
                                actions.resetForm()
                            }

                        }}
                    >{formik => {
                        return(
                            <Form>

                                <CustomField
                                    fieldType={'textarea'}
                                    name={'post'}
                                    placeholder={'Type something clever :)'}
                                    onKeyDown={(e)=>{
                                        if(e.key === 'Enter') {
                                            if(!e.shiftKey) {
                                                e.preventDefault()
                                                formik.handleSubmit()
                                            }
                                        }
                                    }}
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
                { posts.map( (post: PostType) => {

                    let isLiked = likedPosts.some((number) => {
                        return number === post.id;
                    })

                    return (
                        <Post
                            isOwner={isOwner}
                            key={post.id}
                            postId={post.id}
                            likesCount={post.likesCount}
                            userPhoto={userPhoto} // Comes from Profile component
                            modalCallDeletePost={modalCallDeletePost}
                            modalCallLikePost={modalCallLikePost}
                            likePost={likePost}
                            dislikePost={dislikePost}
                            isLiked={isLiked}
                            isAuth={isAuth}
                        >{post.text}</Post>
                    )
                })}
            </div>
        </div>
    )
})



export default Posts