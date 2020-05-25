import {Form, Formik} from "formik";
import s from "../User.module.sass";
import Preloader from "../../../common/Preloader/Preloader";
import profileImgDefault from "../../../../assets/images/default-user.png";
import pencilImg from "../../../../assets/images/pencil-white.svg";
import React from "react";



const Avatar = ({
                    photo,
                    savePhoto,
                    isLoadingAvatar,
                    isOwner,
                    ...props}) => {

    return (
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
                                 style={{backgroundImage: `url(${photo || profileImgDefault})`}}
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
    );

};



export default Avatar;