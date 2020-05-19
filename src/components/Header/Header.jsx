import React from 'react';
import s from './Header.module.sass';
import {NavLink} from "react-router-dom";
import cn from 'classnames'

const Header = React.memo( ({login, isAuth, logout, ...props}) => {

    return (

        <header className={`${s.header}`}>
            <div className={cn('app-wrapper-width', s.container)}>
                <a href='/' className={`${s.logo}`}>
                    <span>AI</span>
                </a>
                <div className={s.loginBlock}>
                    {isAuth === true &&
                        <div>
                            <span onClick={logout} className={cn('button','button-normal', s.userLogin)}>Logout</span>
                            <NavLink to={'/profile'} className={cn('button','button-success',)}>{login}</NavLink>
                        </div>
                    }
                    {isAuth === false &&
                        <NavLink className={cn('button','button-success')} to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </header>

    );
});

export default Header;