import React from 'react';
import s from './Dialog.module.sass';
import {NavLink} from 'react-router-dom';

const Dialog = React.memo(({userId, user, ...props}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/'+userId} activeClassName={s.active} className={s.user}>
                <img src={user.photos && user.photos.small} alt={user.fullName}/>
                <span>{user.fullName}</span>
            </NavLink>
        </div>
    );
});

export default Dialog;