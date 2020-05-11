import React from 'react';
import s from './Profile.module.sass';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from "../common/Preloader/Preloader";

const Profile = React.memo( ({profile, status, updateUserStatus, ...props}) => {
    if(!profile) {
        return <Preloader />
    }

    return (
        <div className={`${s.profile} `}>
            <div className="content-container">
                
                <ProfileInfo
                    profile={profile}
                    status={status}
                    updateUserStatus={updateUserStatus}
                />
                <MyPostsContainer/>

            </div>

        </div>
    );
});

export default Profile;