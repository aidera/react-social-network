import React from 'react'
import s from './Profile.module.sass'
import PostsContainer from './Posts/PostsContainer'
import User from './User/User'
import Preloader from "../common/Preloader/Preloader"
import ErrorContent from "../ErrorContent/ErrorContent"
import {UserContactsType} from "../../types/User";
import {ProfileType} from "../../types/Profile";



type PropsType = {
    profile: ProfileType | null | undefined
    isLoadingProfileInfoChanges: boolean
    isLoadingAvatar: boolean
    status: string | null
    isLoadingStatus: boolean
    updateUserStatus: (status: string | null) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfileInfo: (profileInfo: {
        aboutMe: string | null
        lookingForAJob: boolean
        lookingForAJobDescription: string | null
        fullName: string,
        contacts: UserContactsType
    }) => any
}

const Profile: React.FC<PropsType> = React.memo( ({
                                 profile,
                                 isLoadingProfileInfoChanges,
                                 isLoadingAvatar,
                                 status,
                                 isLoadingStatus,
                                 updateUserStatus,
                                 isOwner,
                                 savePhoto,
                                 saveProfileInfo,
}) => {



    if(profile === null) {
        return <Preloader />
    }

    if(profile === undefined) {
        return <ErrorContent
            h1={'User not found'}
            h2={'Sorry, we have lost this user, but... our best detectives are already looking for him!'}
            linkUrl={'/users'}
            linkText={'Get another try'}
        />
    }



    return (
        <div className={s.profile}>
            <div>
                
                <User
                    profile={profile}
                    isLoadingProfileInfoChanges={isLoadingProfileInfoChanges}
                    isLoadingAvatar={isLoadingAvatar}
                    status={status}
                    isLoadingStatus={isLoadingStatus}
                    updateUserStatus={updateUserStatus}
                    isOwner={isOwner}
                    savePhoto={savePhoto}
                    saveProfileInfo={saveProfileInfo}
                />

                <PostsContainer
                    userPhoto={profile.photos.large}
                    isOwner={isOwner}
                />

            </div>

        </div>
    )
})



export default Profile