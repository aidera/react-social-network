import React, {useState} from "react";
import s from "./Info.module.sass";
import Contact from "./Contact/Contact";
import {CustomField} from "../../../common/FormsControls/CustomFormControls";
import cn from 'classnames';
import PreloaderSmall from "../../../common/PreloaderSmall/PreloaderSmall";
import {Form, Formik} from "formik";
import * as Yup from 'yup';



const Info = React.memo(({
                                    profile,
                                    profileRef,
                                    isOwner,
                                    saveProfileInfo,
                                    isLoadingProfileInfoChanges,
                                    ...props
                                }) => {



    let [editMode, setEditMode] = useState(false);

    const onEditModeChange = (status) => {
        setEditMode(status);
    }

    /* Validate contacts in it's object */
    let contactsValidationSchema = {};
    Object.keys(profile.contacts).forEach((key, i) => {
        contactsValidationSchema[key] = Yup.string().url('This url is not correct. The right example: https://google.com')
    })



    return (
        <div>

            {!editMode &&
                <div className={s.showProfileInfo}>
                    <span><b>Looking for a job:</b> <p>{profile.lookingForAJob === true ? 'yes' : 'no'}</p></span>

                    {profile.lookingForAJob && <span><b>My skills:</b> <p>{profile.lookingForAJobDescription}</p></span>}

                    <span><b>About Me:</b> <p>{profile.aboutMe}</p></span>

                    {Object.keys(profile.contacts).map((keyName, i) => (
                        profile.contacts[keyName] &&
                        <Contact key={i} id={i} link={profile.contacts[keyName]} name={keyName}/>
                    ))}
                </div>
            }

            {isOwner &&
                <>
                    {!editMode &&
                        <button onClick={() => onEditModeChange(true)}
                                className={cn('button', 'button-normal', 'button-small', s.showProfileInfoButton)}
                        >Edit profile info</button>
                    }

                    {editMode &&
                        <Formik
                            initialValues={{
                                fullName: profile.fullName,
                                lookingForAJob: profile.lookingForAJob,
                                lookingForAJobDescription: profile.lookingForAJobDescription,
                                aboutMe: profile.aboutMe,
                                contacts: profile.contacts,
                            }}
                            validationSchema={Yup.object({
                                fullName: Yup.string()
                                    .required('Required'),
                                contacts: Yup.object(
                                    contactsValidationSchema
                                )

                            })}
                            onSubmit={(values, actions) => {
                                saveProfileInfo(values)
                                    .then(()=>{
                                        return window.scrollTop;
                                    })
                                    .catch((error) => {
                                        actions.setFieldError('general', error);
                                    })
                            }}
                        >
                            {formik => {
                                return (
                                    <Form className={s.profileEditor}>

                                        <div className={s.formGroup}>
                                            <b>Full Name:</b>
                                            <div className={s.inputBlock}>
                                                <CustomField
                                                    id='fullName'
                                                    name='fullName'
                                                    fieldType={'input'}
                                                    maxLength={100}
                                                />
                                            </div>
                                        </div>

                                        <div className={cn(s.formGroup, s.group2)}>
                                            <b>Looking for a job:</b>
                                            <div className={s.inputBlock}>
                                                <div className={s.inputBlock}>
                                                    <CustomField
                                                        id='lookingForAJob'
                                                        name='lookingForAJob'
                                                        fieldType={'checkbox'}
                                                        label={'Yes'}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={s.formGroup}>
                                            <b>My professional skills:</b>
                                            <div className={s.inputBlock}>
                                                <CustomField
                                                    id='lookingForAJobDescription'
                                                    name='lookingForAJobDescription'
                                                    fieldType={'textarea'}

                                                />
                                            </div>
                                        </div>

                                        <div className={s.formGroup}>
                                            <b>About Me:</b>
                                            <div className={s.inputBlock}>
                                                <CustomField
                                                    id='aboutMe'
                                                    name='aboutMe'
                                                    fieldType={'textarea'}
                                                />
                                            </div>
                                        </div>

                                        <div className={cn(s.formGroup, s.group5)}>
                                            <b>Contacts:</b>

                                            {Object.keys(profile.contacts).map((key, i) => {
                                                return (
                                                    <div key={i} className={s.inputBlock}>
                                                        <CustomField
                                                            id={'contacts.' + key}
                                                            name={'contacts.' + key}
                                                            fieldType={'input'}
                                                            label={key}
                                                        />
                                                    </div>
                                                )
                                            })}

                                        </div>


                                        {formik.errors.general ? <div className={s.serverError}>{formik.errors.general}</div> : null}

                                        <div className={s.formGroup}>
                                            {!isLoadingProfileInfoChanges &&
                                            <button type={'submit'} className={cn('button', 'button-success', 'button-small')}>Save changes</button>
                                            }
                                            {!!isLoadingProfileInfoChanges &&
                                            <PreloaderSmall/>
                                            }
                                            <div onClick={() => onEditModeChange(false)}
                                                 className={cn('button', 'button-normal', 'button-small', s.buttonCancel)}>Cancel
                                            </div>
                                        </div>



                                    </Form>
                                );
                            }}
                        </Formik>
                    }
                </>
            }
        </div>
    )
});



export default Info;