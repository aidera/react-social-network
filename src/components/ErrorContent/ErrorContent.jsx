import React from 'react';
import s from './ErrorContent.module.sass';
import errorImg from '../../assets/images/kitty/031-kitty-19.svg'
import {NavLink} from "react-router-dom";

const ErrorContent = ({errorType, h1, h2, linkUrl, linkText, ...props}) => {
    return (
        <div className={s.errorContainer}>

            <img src={errorImg} alt={h1}/>
            <h1>{h1}</h1>
            <h2>{h2}</h2>
            <NavLink className={s.link} to={linkUrl}>{linkText}</NavLink>


        </div>
    );
}

export default ErrorContent;