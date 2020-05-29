import React from 'react'
import s from './ErrorContent.module.sass'
import errorNotFoundImg from '../../assets/images/kitty/031-kitty-19.svg'
import {NavLink} from "react-router-dom"
import {Helmet} from "react-helmet"



type PropsType = {
    h1: string
    h2: string
    linkUrl: string
    linkText: string
}

/* Errors in content-block. Not modal. Use with 404 or other 'not found' issues  */
const ErrorContent: React.FC<PropsType> = React.memo(({h1, h2, linkUrl, linkText}) => {
    return (
        <>
            <Helmet>
                <title>{h1+' - '+h2}</title>
            </Helmet>
            <div className={s.errorContainer}>
                <img src={errorNotFoundImg} alt={h1}/>
                <h1>{h1}</h1>
                <h2>{h2}</h2>
                <NavLink className={s.link} to={linkUrl}>{linkText}</NavLink>
            </div>
        </>
    )
})



export default ErrorContent