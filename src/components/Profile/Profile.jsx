import React from 'react';
import s from './Profile.module.sass';
import PostsContainer from './Posts/PostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from "../common/Preloader/Preloader";
import ErrorContent from "../ErrorContent/ErrorContent";

const Profile = React.memo( ({
                                 profile,
                                 isLoadingProfileInfoChanges,
                                 isLoadingAvatar,
                                 status,
                                 isLoadingStatus,
                                 updateUserStatus,
                                 isOwner,
                                 savePhoto,
                                 saveProfileInfo,
                                 ...props}) => {


    if(profile === null) {
        return <Preloader />
    }

    if(profile === undefined) {
        return <ErrorContent
            errorType={500}
            h1={'User not found'}
            h2={'Sorry, we have lost this user, but... our best detectives are already looking for him!'}
            linkUrl={'/users'}
            linkText={'Get another try'}
        />
    }

    const profileRef = React.createRef();

    return (
        <div className={s.profile} ref={profileRef}>
            <div>
                
                <ProfileInfo
                    profile={profile}
                    isLoadingProfileInfoChanges={isLoadingProfileInfoChanges}
                    isLoadingAvatar={isLoadingAvatar}
                    status={status}
                    isLoadingStatus={isLoadingStatus}
                    updateUserStatus={updateUserStatus}
                    isOwner={isOwner}
                    savePhoto={savePhoto}
                    saveProfileInfo={saveProfileInfo}
                    profileRef={profileRef}
                />
                <PostsContainer
                    userPhoto={profile.photos.large}
                    isOwner={isOwner}
                />

            </div>

        </div>
    );
});

export default Profile;