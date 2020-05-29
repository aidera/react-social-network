import React from 'react'
import s from './Overlay.module.sass'


type PropsType = {
    onClick?: () => void
}

const Overlay: React.FC<PropsType> = React.memo(({onClick}) => {
    return <div onClick={onClick} className={s.overlay} />
})



export default Overlay