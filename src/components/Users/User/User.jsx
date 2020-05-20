import React from "react";
import s from './User.module.sass'
import defaultUserPhoto from '../../../assets/images/default-user.png';
import {NavLink} from 'react-router-dom';
import Preloader from "../../common/Preloader/Preloader";

const User = React.memo(({
                             state,
                             follow,
                             unfollow,
                             followingInProgress,
                             ...props}) => {


    let userImage = state.photos.small != null ? state.photos.small : defaultUserPhoto;


    return (
        <div className={s.user}>
            <NavLink to={`/profile/${state.id}`}>
                <div className={s.avatar} style={{backgroundImage: `url(${userImage})`}} />
            </NavLink>
            <div className={s.description}>
                <div className={s.name}>{state.name}</div>
            </div>
            <div className={s.buttons}>
                {followingInProgress.some(id => id === state.id)
                    ? <Preloader />
                    : state.followed === true
                            ? <button className='button' onClick={ () => { unfollow(state.id) } }>Unfollow</button>
                            : <button className='button' onClick={ () => { follow(state.id)} }>Follow</button>

                }

            </div>
        </div>
    );
})

export default User;