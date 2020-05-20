import React from 'react';
import s from './ErrorContent.module.sass';
import errorNotFoundImg from '../../assets/images/kitty/031-kitty-19.svg'
import {NavLink} from "react-router-dom";


/* Errors in content-block. Not modal. Use with 404 or other 'not found' issues  */

const ErrorContent = ({errorType, h1, h2, linkUrl, linkText, ...props}) => {
    return (
        <div className={s.errorContainer}>

            <img src={errorNotFoundImg} alt={h1}/>
            <h1>{h1}</h1>
            <h2>{h2}</h2>
            <NavLink className={s.link} to={linkUrl}>{linkText}</NavLink>


        </div>
    );
}

export default ErrorContent;