import React from 'react';
import s from './ProfileInfo.module.sass';

function ProfileInfo() {
    return (
        <div className={s.profileInfo}>
            <div className={s.avatar}>
                <div className={s.img} style={{backgroundImage: 'url(ava1.jpg)'}} alt="avatar"/>
            </div>
            <div className={s.description}>
                <h1>My Profile</h1>
                Name: Helly
                <br />Age: 17
                <br />City: Arizona
            </div>
        </div>
    );
}

export default ProfileInfo;