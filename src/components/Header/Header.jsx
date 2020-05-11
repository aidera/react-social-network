import React from 'react';
import s from './Header.module.sass';
import {NavLink} from "react-router-dom";

const Header = React.memo( ({login, isAuth, logout, ...props}) => {

    return (

        <header className={`${s.header}`}>
            <a href='/' className={`${s.logo}`}><img src='/fox.png' alt='logo' /></a>
            <div className={s.loginBlock}>
                {isAuth === true ? <div>{login}<span onClick={logout} className={s.button}>Logout</span></div> : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>

    );
});

export default Header;