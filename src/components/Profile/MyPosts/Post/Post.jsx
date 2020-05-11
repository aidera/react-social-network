import React from 'react';
import s from './Post.module.sass';

function Post (props) {

    return (

        <div className={s.post}>
            <div className={s.avatar}>
                <img src="/fox.png" alt="avatar"/>
            </div>
            <div className={s.postText}>
                {props.children}
            </div>
            <div className={s.buttons}>
                <span>Like {props.likesCount}</span>
            </div>
        </div>


    );
}

export default Post;