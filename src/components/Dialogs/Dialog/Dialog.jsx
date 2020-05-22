import React from 'react';
import s from './Dialog.module.sass';
import {NavLink} from 'react-router-dom';
import PreloaderSmall from "../../common/PreloaderSmall/PreloaderSmall";

const Dialog = React.memo(({user, dialogId, ...props}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/'+dialogId} activeClassName={s.active} className={s.user}>
                {!!user &&
                    <>
                        <img src={user.photos && user.photos.small} alt={user.fullName}/>
                        <span>{user.fullName}</span>
                    </>
                }
                {!user &&
                    <PreloaderSmall />
                }
            </NavLink>
        </div>
    );
});

export default Dialog;