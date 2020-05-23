import React from 'react';
import s from './Dialog.module.sass';
import {NavLink} from 'react-router-dom';
import PreloaderSmall from "../../common/PreloaderSmall/PreloaderSmall";

const Dialog = React.memo(({user, ...props}) => {

    return (
        <div className={s.dialog}>
            {!!user &&
                <NavLink to={'/dialogs/'+user.userId} activeClassName={s.active} className={s.user}>
                    <img src={user.photos && user.photos.small} alt={user.fullName}/>
                    <span>{user.fullName}</span>
                </NavLink>
            }
            {!user &&
                <PreloaderSmall />
            }
        </div>
    );
});

export default Dialog;