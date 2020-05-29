import React from 'react'
import s from './Post.module.sass'
import closeImg from '../../../../assets/images/close.svg'
import likeBeforeImg from '../../../../assets/images/like-before.svg'
import likeAfterImg from '../../../../assets/images/like-after.svg'
import defaultUserImg from '../../../../assets/images/default-user.png'



type PropsType = {
    postId: number
    children: string
    likesCount: number
    userPhoto: string | null
    isOwner: boolean
    modalCallDeletePost: (id: number) => void
    modalCallLikePost: () => void
    likePost: (id: number) => void
    dislikePost: (id: number) => void
    isLiked: boolean
    isAuth: boolean
}

const Post: React.FC<PropsType> = React.memo( ({
                              postId,
                              children,
                              likesCount,
                              userPhoto,
                              isOwner,
                              modalCallDeletePost,
                              modalCallLikePost,
                              likePost,
                              dislikePost,
                              isLiked,
                              isAuth,
}) => {

    return (
        <div className={s.post}>

            <div className={s.avatar}>
                <img src={userPhoto || defaultUserImg} alt="avatar"/>
            </div>

            <div className={s.postText} dangerouslySetInnerHTML={{__html: children}} />

            <div className={s.buttons}>
                <p className={s.likesCount}>{likesCount}</p>
                {!isLiked && !!isAuth &&
                    <div title={'Like post'} onClick={() => likePost(postId)} className={s.like}><img src={likeBeforeImg} alt="like"/></div>
                }
                {!!isLiked && !!isAuth &&
                    <div title={'Disike post'} onClick={() => dislikePost(postId)} className={s.like}><img src={likeAfterImg} alt="dislike"/></div>
                }
                {!isAuth &&
                    <div title={'Like post'} onClick={modalCallLikePost} className={s.like}><img src={likeBeforeImg} alt="like"/></div>
                }
            </div>

            {isOwner &&
                <div title={'Delete post'} onClick={()=>{modalCallDeletePost(postId)}} className={s.deletePost}><img src={closeImg} alt="Delete post"/></div>
            }

        </div>
    )
})



export default Post