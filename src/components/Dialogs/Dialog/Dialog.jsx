import React from 'react';
import s from './Dialog.module.sass';
import {NavLink} from 'react-router-dom';
import PreloaderSmall from "../../common/PreloaderSmall/PreloaderSmall";
import defaultUserImg from '../../../assets/images/default-user.png';



const Dialog = React.memo(({user, ...props}) => {

    return (
        <div className={s.dialog}>
            {!!user &&
                <NavLink to={'/dialogs/'+user.userId} activeClassName={s.active} className={s.user}>
                    <img src={user.photos && (user.photos.small || defaultUserImg)} alt={user.fullName}/>
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