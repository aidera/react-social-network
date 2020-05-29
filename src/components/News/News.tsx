import React from 'react'
import s from './News.module.sass'
import {Helmet} from "react-helmet"



function News() {
    return (
        <>
            <Helmet>
                <title>News</title>
            </Helmet>
            <div className={s.news}>
                News
            </div>
        </>
    )
}



export default News