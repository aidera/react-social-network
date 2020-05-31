import React, {useState} from "react"
import s from "./Info.module.sass"
import Contact from "./Contact/Contact"
import {CustomField} from "../../../common/FormsControls/CustomFormControls"
import cn from 'classnames'
import PreloaderSmall from "../../../common/PreloaderSmall/PreloaderSmall"
import {Form, Formik} from "formik"
import * as Yup from 'yup'
import {UserContactsType} from "../../../../types/User"
import {ProfileType} from "../../../../types/Profile"
import {StringSchema} from "yup";



type PropsType = {
    profile: ProfileType
    isOwner: boolean
    saveProfileInfo: (profile: {
        aboutMe: string | null
        lookingForAJob: boolean
        lookingForAJobDescription: string | null
        fullName: string,
        contacts: UserContactsType
    }) => any
    isLoadingProfileInfoChanges: boolean
}

type FormValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: UserContactsType
    general: string
}

const Info: React.FC<PropsType> = React.memo(({
                                    profile,
                                    isOwner,
                                    saveProfileInfo,
                                    isLoadingProfileInfoChanges,
                                }) => {


    const initialValues: FormValuesType = {
        fullName: profile.fullName,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        aboutMe: profile.aboutMe,
        contacts: profile.contacts,
        general: ''
    }

    let [editMode, setEditMode] = useState(false)

    const onEditModeChange = (status: boolean) => {
        setEditMode(status)
    }



    /* Validate contacts in it's object */
    let contactsValidationSchema = {} as { [key: string]: StringSchema }
    (Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).forEach((keyName: string) => {
        contactsValidationSchema[keyName] = Yup.string().url('This url is not correct. The right example: https://google.com')
    }, [] as (typeof profile.contacts[keyof typeof profile.contacts])[]);



    const profileContactsJSX = (Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map((keyName, i) => {
        if(profile.contacts[keyName]){
            return <Contact
                key={i}
                id={i}
                link={profile.contacts[keyName] || ''}
                name={keyName}
            />
        }
        return null
    }, [] as (typeof profile.contacts[keyof typeof profile.contacts])[]);

    return (
        <div>

            {!editMode &&
                <div className={s.showProfileInfo}>
                    <span><b>Looking for a job:</b> <p>{profile.lookingForAJob === true ? 'yes' : 'no'}</p></span>

                    {profile.lookingForAJob && <span><b>My skills:</b> <p>{profile.lookingForAJobDescription}</p></span>}

                    <span><b>About Me:</b> <p>{profile.aboutMe}</p></span>

                    {profileContactsJSX}
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
                            initialValues={initialValues}
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
                                        onEditModeChange(false)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth"
                                        });
                                    })
                                    .catch((error: string) => {
                                        actions.setFieldError('general', error)
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
                                                    name='lookingForAJobDescription'
                                                    fieldType={'textarea'}

                                                />
                                            </div>
                                        </div>

                                        <div className={s.formGroup}>
                                            <b>About Me:</b>
                                            <div className={s.inputBlock}>
                                                <CustomField
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
                                )
                            }}
                        </Formik>
                    }
                </>
            }
        </div>
    )
})



export default Info