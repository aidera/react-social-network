import {Form, Formik} from "formik"
import s from "../User.module.sass"
import Preloader from "../../../common/Preloader/Preloader"
import profileImgDefault from "../../../../assets/images/default-user.png"
import pencilImg from "../../../../assets/images/pencil-white.svg"
import React, {ChangeEvent} from "react"



type PropsType = {
    photo: string | null
    savePhoto: (file: File) => void
    isLoadingAvatar: boolean
    isOwner: boolean
}

type FormValuesType = {
    avatar: File | null
    general: string
}

const Avatar: React.FC<PropsType> = ({
                    photo,
                    savePhoto,
                    isLoadingAvatar,
                    isOwner
}) => {

    const initialValues: FormValuesType = { avatar: null, general: '' };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                const promise = new Promise(() => {
                    if(values.avatar){
                        savePhoto(values.avatar)
                    }
                })
                promise
                    .catch((error) => {
                        actions.setFieldError('general', error)
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
                            <div
                                className={s.img}
                                style={{backgroundImage: `url(${photo || profileImgDefault})`}}
                            />
                        }

                        {isOwner &&
                            <>
                                <input
                                    id={'avatarEditor'}
                                    name={'avatar'}
                                    // onChange={(e) => {
                                    //     return formik.handleSubmit(formik.setFieldValue("avatar", e.currentTarget.files[0])
                                    // }}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const target = e.currentTarget
                                        const targetFiles = target.files
                                        if(targetFiles){
                                            const targetFile = targetFiles[0]
                                            formik.setFieldValue("avatar", targetFile)
                                            formik.handleSubmit()
                                        }
                                    }}
                                    type={'file'}/>
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
    )

}



export default Avatar