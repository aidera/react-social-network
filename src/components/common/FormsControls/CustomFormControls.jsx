import React, {useEffect} from 'react';
import s from './CustomFormControls.module.sass'
import {Field, useField} from "formik";
import cn from 'classnames';
import autosize from "autosize";




export const CustomField = ({ label, fieldType, ...props }) => {
    const [field, meta] = useField(props);



    const textareaResize = (e) => {
        fieldType === 'textarea' && autosize(e)
    }

    useEffect(() => {
        textareaResize(document.getElementsByClassName(s.simpleInput))
    })



    return (
        <div className={s.inputBox}>


            {!!label && fieldType !=='checkbox' &&
            <label htmlFor={props.id || props.name}>{label}</label>
            }

            {fieldType !== 'checkbox' &&
            <Field rows={1} as={fieldType} className={s.simpleInput} {...field} {...props} />
            }

            {fieldType === 'checkbox' &&
            <div className={s.checkboxInput}>
                <Field type='checkbox' checked={field.value} {...field} {...props} />
                <label htmlFor={props.id || props.name}>{label}</label>
            </div>
            }

            {!!props.maxLength &&
            <div className={cn(s.maxLength, {[s.error]: field.value.length >= props.maxLength})}>
                {field.value.length}/{props.maxLength}
            </div>
            }

            {meta.error && meta.touched ? (
                <div className={s.fieldError}>{meta.error}</div>
            ) : null}
        </div>
    );
}



// const Checkbox = ({ children, ...props }) => {
//     // We need to tell useField what type of input this is
//     // since React treats radios and checkboxes differently
//     // than inputs/select/textarea.
//     const [field, meta] = useField({ ...props, type: 'checkbox' });
//     return (
//         <>
//             <label className="checkbox">
//                 <input type="checkbox" {...field} {...props} />
//                 {children}
//             </label>
//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </>
//     );
// };