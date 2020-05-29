import React from 'react'
import s from './Preloader.module.sass'
import img from '../../../assets/images/loader.svg'



const Preloader = React.memo(() => {
    return (
        <div className={s.preloader}>
            <img src={img} alt="preloader"/>
        </div>
    )
})



export default Preloader