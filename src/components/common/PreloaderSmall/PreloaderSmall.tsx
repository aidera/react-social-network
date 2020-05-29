import React from 'react'
import s from './PreloaderSmall.module.sass'
import img from '../../../assets/images/loader.svg'



const PreloaderSmall = React.memo(() => {
    return (
        <div className={s.preloader}>
            <img src={img} alt="preloader"/>
        </div>
    )
})



export default PreloaderSmall