import React from 'react';
import s from './Preloader.module.sass'
import img from '../../../assets/images/loader.svg'

let Preloader = () => {

    return (
        <div className={s.preloader}>
            <img src={img} alt="preloader"/>
        </div>
    )
};

export default Preloader;