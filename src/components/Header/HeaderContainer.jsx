import React from 'react';
import s from './Header.module.sass';

function Header () {
    return (

        <header className={`${s.header}`}>
            <a href='/' className={`${s.logo}`}><img src='/fox.png' alt='logo' /></a>
        </header>

    );
}

export default Header;