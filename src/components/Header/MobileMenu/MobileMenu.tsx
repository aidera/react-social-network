import React, {useEffect, useRef} from 'react'
import s from './MobileMenu.module.sass'
import {NavLink} from "react-router-dom"
import Overlay from "../../common/Overlay/Overlay"
import show from '../../../utils/animations/show'
import hide from '../../../utils/animations/hide'



type PropsType = {
    closeMobileMenu: () => void
}

const MobileMenu: React.FC<PropsType> = React.memo( ({closeMobileMenu}) => {

    const mobileMenu = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(mobileMenu.current !== null){
            show(mobileMenu.current)
        }
    })



    return (
        <div ref={mobileMenu} onClick={() => {mobileMenu.current && hide(mobileMenu.current, closeMobileMenu)}} className={s.mobileMenuContainer}>
            <Overlay  />
            <nav className={s.mobileMenu}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                <NavLink to='/dialogs' activeClassName={s.active}>Dialogs</NavLink>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </nav>
        </div>
    )
})



export default MobileMenu