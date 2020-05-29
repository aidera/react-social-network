import React, {useEffect, useState} from 'react'
import s from './Status.module.sass'
import PreloaderSmall from "../../../common/PreloaderSmall/PreloaderSmall"
import {Form, Formik} from "formik"
import * as Yup from 'yup'
import {CustomField} from "../../../common/FormsControls/CustomFormControls"
import cn from 'classnames'



type PropsType = {
    status: string | null
    updateUserStatus: (status: string | null) => void
    isOwner: boolean
    isLoadingStatus: boolean
}

type FormValuesType = {
    status: string | null,
    general: string
}

const Status: React.FC<PropsType> = React.memo(({
                               status,
                               updateUserStatus,
                               isOwner,
                               isLoadingStatus,
}) => {



    let [editMode, setEditMode] = useState(false)
    let [localStatus, setLocalStatus] = useState(status)

    const initialValues: FormValuesType = {
        status: localStatus,
        general: ''
    }

    const changeEditMode = (status: boolean) => {
        isOwner && setEditMode(status)
    }

    useEffect(() => {
        setLocalStatus(status)
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
                    initialValues={initialValues}
                    validationSchema={Yup.object({
                        status: Yup.string()
                            .max(300, 'sdv')
                    })}
                    onSubmit={(values, actions) => {
                        changeEditMode(false)
                        const promise = new Promise(() => {
                            updateUserStatus(values.status)
                        })
                        promise
                            .catch(error => {
                                changeEditMode(true)
                                actions.setFieldError('general', error)
                            })
                    }}
                >
                    {formik => (
                        <Form onBlur={formik.handleSubmit}>
                            <div className={s.statusBlock}>
                                <CustomField
                                    maxLength={300}
                                    fieldType={'textarea'}
                                    name={'status'}
                                    autoFocus={true}
                                    onKeyDown={(e)=>{
                                        if(e.key === 'Enter') {
                                            if(!e.shiftKey) {
                                                e.preventDefault()
                                                formik.handleSubmit()
                                            }
                                        }
                                        if(e.key === 'Escape'){
                                            changeEditMode(false)
                                            setLocalStatus(status)
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



export default Status