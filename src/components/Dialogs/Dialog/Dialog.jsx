import React from 'react';
import s from './Dialog.module.sass';
import {NavLink} from 'react-router-dom';

const Dialog = React.memo(({userID, name, ...props}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/'+userID} activeClassName={s.active}>{name}</NavLink>
        </div>
    );
});

export default Dialog;