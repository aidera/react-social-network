import React from 'react';
import s from './FormsControls.module.sass'



const Field = ({input, meta, child, Element, ...props})  => {
    let hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + ' ' + (hasError && s.error)}>
            <Element {...input} {...props} />
            <br/>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    return <Field {...props} Element={'textarea'}/>
}

export const Input = (props) => {
    return <Field {...props} Element={'input'}/>
}