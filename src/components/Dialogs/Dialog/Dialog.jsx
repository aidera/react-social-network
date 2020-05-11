import React from 'react';
import s from './Dialog.module.sass';
import {NavLink} from 'react-router-dom';

function Dialog(props) {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/'+props.userID} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    );
}

export default Dialog;