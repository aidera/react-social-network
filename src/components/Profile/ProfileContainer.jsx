import React from 'react';
import s from './Profile.module.sass';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';




function Profile () {

    return (
        <div className={`${s.profile} `}>
            <div><img src="/forest.jpg" alt="profile background" /></div>
            <div className="content-container">
                
                <ProfileInfo />
                <MyPostsContainer/>

            </div>

        </div>
    );
}

export default Profile;