import React, {useState} from 'react'
import s from './Header.module.sass'
import {NavLink} from "react-router-dom"
import cn from 'classnames'
import menuImg from '../../assets/images/menu.svg'
import MobileMenu from "./MobileMenu/MobileMenu"



type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

const Header: React.FC<PropsType> = React.memo( ({login, isAuth, logout}) => {

    let [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)

    const openMobileMenu = () => {
        setIsOpenMobileMenu(true)
    }

    const closeMobileMenu = () => {
        setIsOpenMobileMenu(false)
    }



    return (
        <>
            <header className={`${s.header}`}>
                <div className={cn('width-wrapper', s.container)}>
                    <a href='/' className={`${s.logo}`}>
                        <span>AI</span>
                    </a>
                    <div className={s.menuController} onClick={openMobileMenu} >
                        <img src={menuImg} alt="menu controller"/>
                    </div>
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

            {isOpenMobileMenu &&
                <MobileMenu closeMobileMenu={closeMobileMenu} />
            }
        </>
    )
})



export default Header