import React from "react"
import s from './User.module.sass'
import defaultUserPhoto from '../../../assets/images/default-user.png'
import {NavLink} from 'react-router-dom'
import PreloaderSmall from "../../common/PreloaderSmall/PreloaderSmall"
import cn from 'classnames'
import mailImg from '../../../assets/images/mail.svg'
import {UserType} from "../../../types/User";



type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    isAuth: boolean
}

const User: React.FC<PropsType> = React.memo(({
                             user,
                             follow,
                             unfollow,
                             followingInProgress,
                             isAuth
}) => {



    return (
        <div data-id={user.id} className={s.user}>

            <NavLink to={`/profile/${user.id}`}>
                <div className={s.avatar} style={{backgroundImage: `url(${user.photos.small || defaultUserPhoto})`}} />
            </NavLink>

            <div className={s.description}>
                <div className={s.name}>{user.name}</div>
            </div>

            {!!isAuth &&
                <div className={s.buttons}>
                    {followingInProgress.some(id => id === user.id)
                        ? <PreloaderSmall />
                        : user.followed
                                ? <button className={cn('button', 'button-normal', s.followButton)} onClick={ () => { unfollow(user.id) } }>Unfollow</button>
                                : <button className={cn('button', 'button-success', s.followButton)} onClick={ () => { follow(user.id)} }>+ Follow</button>

                    }
                    <NavLink to={`/dialogs/${user.id}`} className={cn('button', 'button-success', s.startConversation)}><img src={mailImg} alt="start conversation"/></NavLink>
                </div>
            }

        </div>
    )
})

export default User