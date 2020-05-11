import React from 'react';
import s from './Navbar.module.sass';
import {NavLink} from 'react-router-dom';
// import Friends from './Friends/Friends';

function Navbar (props) {

    return (
        <div className={s.navbar}>
            <nav>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                <NavLink to='/dialogs' activeClassName={s.active}>Dialogs</NavLink>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
                <NavLink to='/news' activeClassName={s.active}>News</NavLink>
                <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
                <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
            </nav>


            {/*<Friends state={props.state.friends} />*/}

        </div>
    );
}

export default Navbar;