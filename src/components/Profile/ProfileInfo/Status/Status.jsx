import React, {useEffect, useState} from 'react';
import s from './Status.module.sass'
import PreloaderSmall from "../../../common/PreloaderSmall/PreloaderSmall";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {CustomField} from "../../../common/FormsControls/CustomFormControls";
import cn from 'classnames';




/* Status demonstration and status redactor */
/* No buttons submit. Used onBlur submit and onClick edit mode activation. Also with ESC button edit mode will off */
const Status = React.memo(({
                               status,
                               updateUserStatus,
                               isOwner,
                               isLoadingStatus,
                               ...props}) => {



    /* Edit mode for status redactor */
    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(status);


    const changeEditMode = (status) => {
        isOwner && setEditMode(status);
    }






    useEffect(() => {
        setLocalStatus(status);
    }, [status])






    return (
        <div>
            {(!editMode && !isLoadingStatus) &&
                <div onClick={() => changeEditMode(true)} className={s.statusBlock}>
                    <span className={cn({[s.pointer]: isOwner})}>{status || '------'}</span>
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
                                    fieldType={'textarea'}
                                    name={'status'}
                                    autoFocus={true}
                                    onBlur={formik.handleSubmit}
                                    onKeyDown={(e)=>{
                                        if(e.key === 'Enter') {
                                            if(!e.shiftKey) {
                                                e.preventDefault();
                                                formik.handleSubmit()
                                            }
                                        }
                                        if(e.key === 'Escape'){
                                            changeEditMode(false);
                                            setLocalStatus(status);
                                        }
                                    }}
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