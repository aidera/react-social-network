import React from "react";
import s from './User.module.sass'
import defaultUserPhoto from '../../../assets/images/default-user.png';

let User = (props) => {

    let userImage = props.state.photos.small != null ? props.state.photos.small : defaultUserPhoto;

    return (
        <div className={s.user}>
            <div className={s.avatar} style={{backgroundImage: `url(${userImage})`}} />
            <div className={s.description}>
                <div className={s.name}>{props.state.name}</div>
                {/*<div className={s.loaction}>{`${props.state.location.city}, ${props.state.location.country}`}</div>*/}
            </div>
            <div className={s.buttons}>
                {props.state.followed === true
                    ? <button className='button' onClick={ () => { props.unfollow(props.state.id) } }>Unfollow</button>
                    : <button className='button' onClick={ () => { props.follow(props.state.id)} }>Follow</button>
                }
            </div>
        </div>
    );
}

export default User;