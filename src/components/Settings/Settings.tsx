import React from 'react'
import s from './Settings.module.sass'
import {Helmet} from "react-helmet"



function Settings() {
    return (
        <>
            <Helmet>
                <title>Settings</title>
            </Helmet>
            <div className={s.settings}>
                Settings
            </div>
        </>
    )
}



export default Settings