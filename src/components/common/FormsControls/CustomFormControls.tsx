import React, {useEffect, useRef} from 'react'
import s from './CustomFormControls.module.sass'
import {Field, useField} from "formik"
import cn from 'classnames'
import autosize from "autosize"



type CustomFieldType = {
    name: string
    fieldType: string
    label?: string
    maxLength?: number
    placeholder?: string
    type?: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void
    autoFocus?: boolean
}

export const CustomField: React.FC<CustomFieldType> = React.memo(({
            name,
            label,
            fieldType,
            maxLength,
            placeholder,
            type,
            onKeyDown,
            autoFocus,
}) => {

    const [field, {error, touched}] = useField(name)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // const textareaAutosizeTyping = () => {
    //     const target = textareaRef.current
    //     if(target !== null){
    //         autosize(target)
    //     }
    // }

    useEffect(() => {
        if(textareaRef && textareaRef.current){
            autosize(textareaRef.current)
        }

    })





    const inputGroupSwitcher = () => {
        switch (fieldType) {
            case 'input':
                return inputGroup()

            case 'textarea':
                return textareaGroup()

            case 'checkbox':
                return checkboxGroup()

            default:
                return inputGroup()
        }
    }

    const inputGroup = () => {
        return (
            <>
                {!!label &&
                    <label htmlFor={'form-'+name}>{label}</label>
                }

                <Field
                    as='input'
                    id={'form-'+name}
                    className={s.simpleField}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    type={type}
                    autoFocus={autoFocus}

                    {...field}
                />

                {maxLengthCounter(field.value.length, maxLength)}
                {errorContainer(error, touched)}
            </>
        )
    }

    const textareaGroup = () => {
        return (
            <>
                {!!label &&
                    <label htmlFor={'form-'+name}>{label}</label>
                }

                <textarea
                    id={'form-'+name}
                    rows={1}
                    ref={textareaRef}
                    className={s.simpleField}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    onKeyDown={onKeyDown}
                    autoFocus={autoFocus}
                    {...field}
                />

                {maxLengthCounter(field.value.length, maxLength)}
                {errorContainer(error, touched)}
            </>
        )
    }

    const checkboxGroup = () => {
        return (
            <>
                <div className={s.checkboxInput}>
                    <Field
                        id={'form-'+name}
                        type='checkbox'
                        checked={field.value}
                        placeholder={placeholder}
                        {...field}
                    />
                    <label htmlFor={'form-'+name}>{label}</label>
                </div>

                {errorContainer(error, touched)}
            </>
        )
    }


    const errorContainer = (error: any, touched: any) => {
        if(error && touched){
            return (
                <div className={s.fieldError}>{error}</div>
            )
        }
    }

    const maxLengthCounter = (currentLength: number, maxLength: number | undefined) => {
        if(maxLength) {
            return (
                <div className={cn(s.maxLength, {[s.error]: currentLength >= maxLength})}>
                    {currentLength}/{maxLength}
                </div>
            )
        }
    }



    return (
        <div className={s.fieldGroup}>
            {inputGroupSwitcher()}
        </div>
    )
})



