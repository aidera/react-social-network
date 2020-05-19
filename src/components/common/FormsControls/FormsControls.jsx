import React from 'react';
import s from './FormsControls.module.sass'
import {Field} from "redux-form";
import cn from 'classnames';



const FormControl = ({input, meta, child, Element, label, ...props })  => {
    let hasError = meta.touched && meta.error;

    return (
        <div className={cn(s.formControl, {[s.error]: hasError, [s.wide]: props.wide})}>
            {label && props.type !== 'checkbox' &&
                <label className={s.textInputLabel} htmlFor={`${props.id}`}>{label}</label>
            }
            <Element {...input} {...props} />
            {label && props.type === 'checkbox' &&
                <label htmlFor={`${props.id}`}>{label}</label>
            }

            {hasError && <div><span>{meta.error}</span></div>}
        </div>
    )
}

export const Textarea = (props) => {
    return <FormControl {...props} Element={'textarea'}/>
}

export const Input = (props) => {
    return <FormControl {...props} Element={'input'}/>
}

export const createField = (placeholder, name, validators, component, label = "", props = {} ) => {
    return <Field
            key={props.key}
            placeholder={placeholder}
            id={`${name}-form`}
            name={name}
            validate={validators}
            component={component}
            label={label}
            {...props}
        />


}