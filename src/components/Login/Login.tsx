import React from 'react'
import s from './Login.module.sass'
import * as Yup from "yup"
import {CustomField} from "../common/FormsControls/CustomFormControls"
import {Form, Formik} from "formik"
import cn from 'classnames'
import PreloaderSmall from "../common/PreloaderSmall/PreloaderSmall"



type PropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => any
    captchaUrl: string | null
    isLoading: boolean
}

type FormValuesType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string | null
    general: string
}

const Login: React.FC<PropsType> = React.memo(({login, captchaUrl, isLoading}) => {

    const initialValues: FormValuesType = {
        login: '',
        password: '',
        rememberMe: true,
        captcha: '',
        general: ''
    };

    return (
        <div className={s.loginPage}>
            <h1>Login</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .required('Required'),
                    password: Yup.string()
                        .required('Required'),

                })}
                onSubmit={(values, actions) => {
                    // const promise = new Promise(() => {
                    //     return login(values.login, values.password, values.rememberMe, values.captcha)
                    // })
                    // promise
                    //     .then((response) => {
                    //         console.log(response)
                    //     })
                    //     .catch((error)=> {
                    //         actions.setFieldError('general', error)
                    //     })
                    login(values.login, values.password, values.rememberMe, values.captcha)
                        .catch((error: string) => {
                            actions.setFieldError('general', error)
                        })
                }}
            >
                {formik => {
                    return (
                        <Form>
                            <div className={s.inputGroup}>
                                <CustomField
                                    fieldType={'input'}
                                    name={'login'}
                                    placeholder={'Login'}
                                />
                            </div>
                            <div className={s.inputGroup}>
                                <CustomField
                                    fieldType={'input'}
                                    name={'password'}
                                    placeholder={'Password'}
                                    type={'password'}
                                />
                            </div>
                            <div className={s.inputGroup}>
                                <CustomField
                                    name={'rememberMe'}
                                    label={'remember me'}
                                    fieldType={'checkbox'}
                                />
                            </div>

                            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                            {captchaUrl &&
                            <div className={s.inputGroup}>
                                <CustomField
                                    fieldType={'input'}
                                    name={'captcha'}
                                />
                            </div>
                            }

                            {formik.errors.general ? <div className={s.formSummaryError}>{formik.errors.general}</div> : null}

                            <div>
                                {!isLoading &&
                                    <button type={'submit'} className={cn('button', 'button-success')}>Login</button>
                                }
                                {!!isLoading &&
                                    <PreloaderSmall />
                                }
                            </div>
                        </Form>

                    )
                }}

            </Formik>

            <div className={s.testAccountContainer}>
                <h2>Hey, looking for a test account?</h2>
                <span>Use this one: </span>
                <i>hope.aidera@gmail.com</i>
                <i>Qn2bGpN_qGxtZKq</i>
                <br/>
                <span>Or create your own in</span>
                <i><a rel="noopener noreferrer" target={'_blank'} href="https://social-network.samuraijs.com/">https://social-network.samuraijs.com/</a></i>
            </div>
        </div>
    )
})



export default Login