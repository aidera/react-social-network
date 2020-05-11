import React from 'react';
import s from './Post.module.sass';

const Post = React.memo( ({children, likesCount, ...props}) => {

    return (

        <div className={s.post}>
            <div className={s.avatar}>
                <img src="/fox.png" alt="avatar"/>
            </div>
            <div className={s.postText}>
                {children}
            </div>
            <div className={s.buttons}>
                <span>Like {likesCount}</span>
            </div>
        </div>


    );
})

export default Post;