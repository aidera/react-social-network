import React from 'react';
import s from './ProfileInfo.module.sass';
import Status from './Status/Status'
import profileImgDefault from '../../../assets/images/default-user.png'
import pencilImg from '../../../assets/images/pencil-white.svg';
import ProfileData from "./ProfileData/ProfileData";
import {Form, Formik} from "formik";
import Preloader from "../../common/Preloader/Preloader";



/* Connect status, user information and avatar (avatar edits here) */
const ProfileInfo = React.memo(({
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

            {/*Avatar and it's edit mode*/}
            <div className={s.photos}>
                <Formik
                    initialValues={{
                        avatar: null
                    }}
                    onSubmit={(values, actions, ...props) => {
                        savePhoto(values.avatar)
                            .catch((error) => {
                                actions.setFieldError('general', error);
                            })
                    }}
                >{formik => {
                    return (
                        <Form>
                            <div className={s.avatar}>
                                {isLoadingAvatar &&
                                    <Preloader />
                                }
                                {!isLoadingAvatar &&
                                <div className={s.img}
                                     style={{backgroundImage: `url(${profile.photos.large || profileImgDefault})`}}
                                     alt="avatar"/>
                                }
                                {isOwner &&
                                <>
                                    <input id={'avatarEditor'} name={'avatar'} onChange={e => formik.handleSubmit(formik.setFieldValue("avatar", e.currentTarget.files[0]) )} type={'file'}/>
                                    <label htmlFor={'avatarEditor'}>
                                        <img src={pencilImg} alt="edit avatar"/>
                                    </label>
                                </>
                                }
                            </div>

                            {formik.errors.general && formik.values.avatar &&
                                <div className={s.imgFormError}>{formik.errors.general}</div>
                            }
                        </Form>
                    )
                }}

                </Formik>
            </div>




            {/*Status and information connects*/}
            <div className={s.description}>
                <h1>{profile.fullName}</h1>
                <Status
                    status={status}
                    isLoadingStatus={isLoadingStatus}
                    updateUserStatus={updateUserStatus}
                    isOwner={isOwner}

                />
                <ProfileData
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


export default ProfileInfo;