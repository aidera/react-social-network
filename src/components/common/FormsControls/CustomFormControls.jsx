import React, {useEffect, useRef} from 'react';
import s from './CustomFormControls.module.sass'
import {Field, useField} from "formik";
import cn from 'classnames';
import autosize from "autosize";



export const CustomField = React.memo(({label, fieldType, ...props }) => {

    const [field, meta] = useField(props);

    const textareaRef = useRef(null);
    const textareaAutosizeTyping = (e) => {
        fieldType === 'textarea' && autosize(e)
    }

    useEffect(() => {
        autosize(textareaRef.current)
        textareaAutosizeTyping(textareaRef.current)
    })


    const inputGroupSwitcher = () => {
        switch (fieldType) {
            case 'input':
                return inputGroup();

            case 'textarea':
                return textareaGroup();

            case 'checkbox':
                return checkboxGroup();

            default:
                return inputGroup();
        }
    }

    const inputGroup = () => {
        return (
            <>
                {!!label &&
                    <label htmlFor={props.id || props.name}>{label}</label>
                }

                <Field as='input'  className={s.simpleField} {...field} {...props} />

                {maxLengthCounter(props.maxLength, field.value.length)}
                {errorContainer(meta)}
            </>
        );
    }

    const textareaGroup = () => {
        return (
            <>
                {!!label &&
                    <label htmlFor={props.id || props.name}>{label}</label>
                }

                <textarea rows={1} ref={textareaRef} className={s.simpleField} {...field} {...props} />

                {/*{maxLengthCounter(props.maxLength, field.value.length)}*/}
                {/*{errorContainer(meta)}*/}
            </>
        );
    }

    const checkboxGroup = () => {
        return (
            <>
                <div className={s.checkboxInput}>
                    <Field type='checkbox' checked={field.value} {...field} {...props} />
                    <label htmlFor={props.id || props.name}>{label}</label>
                </div>

                {errorContainer(meta)}
            </>
        );
    }

    const errorContainer = () => {
        if(meta.error && meta.touched){
            return (
                <div className={s.fieldError}>{meta.error}</div>
            );
        }
    }

    const maxLengthCounter = () => {
        if(!!props.maxLength) {
            return (
                <div className={cn(s.maxLength, {[s.error]: field.value.length >= props.maxLength})}>
                    {field.value.length}/{props.maxLength}
                </div>
            );
        }
    }



    return (
        <div className={s.fieldGroup}>
            {inputGroupSwitcher()}
        </div>
    );
})



