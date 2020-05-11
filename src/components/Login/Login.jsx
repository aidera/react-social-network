import React from 'react';
import s from './Login.module.sass'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


let maxLength40 = maxLengthCreator(40);


const LoginForm = React.memo(({handleSubmit, error, ...props}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    component={Input}
                    name={'login'}
                    placeholder={'Login'}
                    validate={[required, maxLength40]}
                />
            </div>
            <div>
                <Field
                    component={Input}
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    validate={[required, maxLength40]}
                />
            </div>
            <div>
                <Field
                    component={"input"}
                    name={'rememberMe'}
                    type={'checkbox'}
                /> remember me
            </div>
            <div className={s.formSummaryError}>{error}</div>
            <div>
                <button className='button'>Login</button>
            </div>
        </form>
    )
});

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)




const Login = ({login, ...props}) => {

    const onSubmit = (formData) => {
        login(formData.login,formData.password,formData.rememberMe)

    }

    return (
        <div className={s.loginPage}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;