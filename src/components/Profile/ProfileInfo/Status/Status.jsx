import React, {useEffect, useState} from 'react';
import s from './Status.module.sass'
import PreloaderSmall from "../../../common/PreloaderSmall/PreloaderSmall";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {CustomField} from "../../../common/FormsControls/CustomFormControls";




const Status = React.memo(({
                               status,
                               updateUserStatus,
                               isOwner,
                               isLoadingStatus,
                               ...props}) => {




    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(status);


    const changeEditMode = (status) => {
        isOwner && setEditMode(status);
    }


    const cancelStatus = (e) => {
        if(e.key === 'Escape'){
            changeEditMode(false);
            setLocalStatus(status);
        }
    }




    useEffect(() => {
        setLocalStatus(status);
    }, [status])






    return (
        <div>
            {(!editMode && !isLoadingStatus) &&
                <div onClick={() => changeEditMode(true)} className={s.statusBlock}>
                    <span>{status || '------'}</span>
                </div>
            }
            {(!editMode && !!isLoadingStatus) &&
                <div className={s.preloaderContainer}>
                    <PreloaderSmall />
                </div>
            }
            {editMode &&
                <Formik

                    initialValues={{
                        status: localStatus
                    }}

                    validationSchema={Yup.object({
                        status: Yup.string()
                            .max(300, 'sdv')
                    })}

                    onSubmit={async (values, actions) => {
                        changeEditMode(false);
                        await updateUserStatus(values.status)
                            .catch(error => {
                                changeEditMode(true);
                                actions.setFieldError('general', error);
                            })



                    }}

                >
                    {formik => (
                        <Form>
                            <div className={s.statusBlock}>
                                <CustomField
                                    maxLength={300}
                                    onKeyDown={cancelStatus}
                                    fieldType={'textarea'}
                                    name={'status'}
                                    autoFocus={true}
                                    onBlur={formik.handleSubmit}
                                />
                                {formik.errors.general ? <div>{formik.errors.general}</div> : null}
                            </div>
                        </Form>
                        )
                    }

                </Formik>
            }
        </div>
    )


})




export default Status;