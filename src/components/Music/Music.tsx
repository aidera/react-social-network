import React from 'react'
import s from './Music.module.sass'
import {Helmet} from "react-helmet"



function Music() {
    return (
        <>
            <Helmet>
                <title>Music</title>
            </Helmet>
            <div className={s.music}>
                Music
            </div>
        </>
    )
}



export default Music