import React from 'react';
import s from './PreloaderSmall.module.sass'
import img from '../../../assets/images/loader.svg'



let PreloaderSmall = () => {
    return (
        <div className={s.preloader}>
            <img src={img} alt="preloader"/>
        </div>
    )
};



export default PreloaderSmall;