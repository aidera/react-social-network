import React from 'react';
import s from './User.module.sass';
import Status from './Status/Status'
import Info from "./Info/Info";
import Avatar from './Avatar/Avatar'



const User = React.memo(({
                                    profile,
                                    profileRef,
                                    status,
                                    isLoadingStatus,
                                    isLoadingProfileInfoChanges,
                                    isLoadingAvatar,
                                    updateUserStatus,
                                    isOwner,
                                    savePhoto,
                                    saveProfileInfo,
                                    ...props}) => {



    return (
        <div className={s.profileInfo}>
            <div className={s.photos}>
                <Avatar
                    isLoadingAvatar={isLoadingAvatar}
                    photo={profile.photos.large}
                    savePhoto={savePhoto}
                    isOwner={isOwner}
                />
            </div>

            <div className={s.description}>
                <h1>{profile.fullName}</h1>
                <Status
                    status={status}
                    isLoadingStatus={isLoadingStatus}
                    updateUserStatus={updateUserStatus}
                    isOwner={isOwner}

                />
                <Info
                    isOwner={isOwner}
                    profile={profile}
                    isLoadingProfileInfoChanges={isLoadingProfileInfoChanges}
                    saveProfileInfo={saveProfileInfo}
                    profileRef={profileRef}
                />
            </div>
        </div>
    );
});


export default User;