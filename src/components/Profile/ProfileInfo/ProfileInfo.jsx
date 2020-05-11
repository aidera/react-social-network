import React from 'react';
import s from './ProfileInfo.module.sass';
import Status from './Status/Status'

const ProfileInfo = React.memo(({profile, status, updateUserStatus, ...props}) => {

    return (
        <div className={s.profileInfo}>
            <div className={s.avatar}>
                <div className={s.img} style={{backgroundImage: `url(${profile.photos.large})`}} alt="avatar"/>
            </div>

            <div className={s.description}>
                <h1>{profile.fullName}</h1>
                <Status
                    status={status}
                    updateUserStatus={updateUserStatus}
                />
                <br />Looking for a job: {profile.lookingForAJob === true ? 'yes' : 'no'}
                <br />Description: {profile.lookingForAJobDescription}
                <br />Contacts:
                    <ul>
                        {Object.keys(profile.contacts).map((keyName, i) => (
                            <li key={i}>
                                <span>{keyName}: {profile.contacts[keyName]}</span>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    );
});

export default ProfileInfo;