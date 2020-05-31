import React from 'react'
import s from './User.module.sass'
import Status from './Status/Status'
import Info from "./Info/Info"
import Avatar from './Avatar/Avatar'
import {UserContactsType} from "../../../types/User";
import {ProfileType} from "../../../types/Profile";



type PropsType = {
    profile: ProfileType
    status: string | null
    isLoadingStatus: boolean
    isLoadingProfileInfoChanges: boolean
    isLoadingAvatar: boolean
    updateUserStatus: (status: string | null) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfileInfo: (profileInfo: {
        aboutMe: string | null
        lookingForAJob: boolean
        lookingForAJobDescription: string | null
        fullName: string,
        contacts: UserContactsType
    }) => void
}

const User: React.FC<PropsType> = React.memo(({
                                    profile,
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
                />
            </div>
        </div>
    )
})


export default User