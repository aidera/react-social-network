import React from "react";
import s from './User.module.sass'
import defaultUserPhoto from '../../../assets/images/default-user.png';
import {NavLink} from 'react-router-dom';
import PreloaderSmall from "../../common/PreloaderSmall/PreloaderSmall";
import cn from 'classnames';
import mailImg from '../../../assets/images/mail.svg';



const User = React.memo(({
                             state,
                             follow,
                             unfollow,
                             followingInProgress,
                             isAuth,
                             ...props}) => {



    return (
        <div data-id={state.id} className={s.user}>

            <NavLink to={`/profile/${state.id}`}>
                <div className={s.avatar} style={{backgroundImage: `url(${state.photos.small || defaultUserPhoto})`}} />
            </NavLink>

            <div className={s.description}>
                <div className={s.name}>{state.name}</div>
            </div>

            {!!isAuth &&
                <div className={s.buttons}>
                    {followingInProgress.some(id => id === state.id)
                        ? <PreloaderSmall />
                        : state.followed === true
                                ? <button className={cn('button', 'button-normal', s.followButton)} onClick={ () => { unfollow(state.id) } }>Unfollow</button>
                                : <button className={cn('button', 'button-success', s.followButton)} onClick={ () => { follow(state.id)} }>+ Follow</button>

                    }
                    <NavLink to={`/dialogs/${state.id}`} className={cn('button', 'button-success', s.startConversation)}><img src={mailImg} alt="start conversation"/></NavLink>
                </div>
            }

        </div>
    );
})

export default User;