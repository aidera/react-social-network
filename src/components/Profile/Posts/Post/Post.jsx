import React from 'react';
import s from './Post.module.sass';
import closeImg from '../../../../assets/images/close.svg'
import likeBeforeImg from '../../../../assets/images/like-before.svg';
import likeAfterImg from '../../../../assets/images/like-after.svg';
import defaultUserImg from '../../../../assets/images/default-user.png';



const Post = React.memo( ({
                              postID,
                              children,
                              likesCount,
                              userPhoto,
                              isOwner,
                              modalCallDeletePost,
                              modalCallLikePost,
                              likePost,
                              dislikePost,
                              liked,
                              isAuth,
                              ...props}) => {

    return (

        <div className={s.post}>


            <div className={s.avatar}>
                <img src={userPhoto || defaultUserImg} alt="avatar"/>
            </div>

            <div className={s.postText} dangerouslySetInnerHTML={{__html: children}} />

            <div className={s.buttons}>
                <p className={s.likesCount}>{likesCount}</p>
                {!liked && !!isAuth &&
                    <div title={'Like post'} onClick={() => likePost(postID)} className={s.like}><img src={likeBeforeImg} alt="like"/></div>
                }
                {!!liked && !!isAuth &&
                    <div title={'Disike post'} onClick={() => dislikePost(postID)} className={s.like}><img src={likeAfterImg} alt="dislike"/></div>
                }
                {!isAuth &&
                    <div title={'Like post'} onClick={modalCallLikePost} className={s.like}><img src={likeBeforeImg} alt="like"/></div>
                }

            </div>

            {isOwner &&
                <div title={'Delete post'} onClick={()=>{modalCallDeletePost(postID)}} className={s.deletePost}><img src={closeImg} alt="Delete post"/></div>
            }

        </div>


    );
})

export default Post;