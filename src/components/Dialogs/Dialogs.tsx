import React, {useEffect, useRef} from 'react'
import s from './Dialogs.module.sass'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import cn from 'classnames'
import {CustomField} from "../common/FormsControls/CustomFormControls"
import {Form, Formik} from "formik"
import sendImg from '../../assets/images/send-message_white.svg'
import arrowBackImg from '../../assets/images/arrow-left.svg'
import Preloader from "../common/Preloader/Preloader"
import {DialogType} from "../../types/Dialog"
import {MessageType} from "../../types/Message"
import {UserType} from "../../types/User"



type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    users: Array<UserType>
    currentDialogId: number | null
    currentUser: UserType | null
    isMessageFetching: boolean
    isMessagesLoading: boolean

    sendMessage: (userId: number, newMessage: string, date: number) => void
    setDialog: (userId: number) => void
    findUserInUsersArray: (userId: number) => UserType | null
}

interface FormValuesType {
    message: string
    general: string
}

const Dialogs = React.memo((props: PropsType) => {

    const initialValues: FormValuesType = { message: '', general: '' }

    const {dialogs,
        messages,
        sendMessage,
        currentDialogId,
        currentUser,
        isMessageFetching,
        isMessagesLoading,
        findUserInUsersArray} = props



    const submitSendMessage = async (values: any, actions: any) => {
        if (values.message.length > 0 && !isMessageFetching && !isMessagesLoading) {
            try{
                if(currentDialogId){
                    await sendMessage(currentDialogId, values.message, Date.now())
                    dialogsScrollTo()
                    actions.resetForm({message: ''})
                }
            }catch(error){
                actions.setFieldError('general', error)
            }
        }
    }


    /* Scrolls down all messages after sending one and in the beginning */
    const dialogsScrollToRef = useRef<HTMLDivElement>(null)

    const dialogsScrollTo = () => {
        const target = dialogsScrollToRef.current
        if(target){
            target.scrollTo(0,target.scrollHeight)
        }

    }

    useEffect(()=>{
        dialogsScrollTo()
    })



    /* Mobile versions animation */
    const dialogsListRef = useRef<HTMLDivElement>(null)
    const showDialogsListRef = useRef<HTMLDivElement>(null)
    const dialogsListRefTarget = dialogsListRef.current
    const showDialogsListRefTarget = showDialogsListRef.current

    const showDialogs = () => {
        if(dialogsListRefTarget && showDialogsListRefTarget){
            dialogsListRefTarget.style.left = '0px'
            showDialogsListRefTarget.style.left = '200%'
        }
    }
    const hideDialogs = () => {
        if(dialogsListRefTarget && showDialogsListRefTarget){
            dialogsListRefTarget.style.left = '-100%'
            showDialogsListRefTarget.style.left = '0px'
        }
    }

    useEffect(()=>{
        if(!!currentDialogId){
            hideDialogs()
        }
    })


    const userFullName = currentUser && currentUser.fullName



    return (
        <div className={s.dialogs}>

            <div ref={showDialogsListRef} onClick={showDialogs} className={s.showDialogsList}>
                <img src={arrowBackImg} alt="show dialogs"/>
                <span>{!isMessagesLoading && userFullName}</span>
            </div>

            <div ref={dialogsScrollToRef} className={s.dialogsContainer}>

                <div ref={dialogsListRef} onClick={hideDialogs} className={s.dialogsList}>
                    {dialogs.map(dialog => {
                        const opponentUser: UserType | null = findUserInUsersArray(dialog.opponentId)
                        return <Dialog
                            key={dialog.id}
                            user={opponentUser}
                        />
                    })}
                </div>

                <div className={s.userName}>{!(isMessageFetching || isMessagesLoading) && userFullName}</div>

                <div className={s.messagesList}>
                    {!isMessagesLoading &&
                        <>
                            {messages.map(message => {
                                if (message.opponentId === currentDialogId) {
                                    const opponentUser: UserType | null = findUserInUsersArray(message.opponentId)
                                    return <Message
                                        key={message.id}
                                        opponent={opponentUser}
                                        from={message.from}
                                        messageText={message.messageText}
                                        date={message.date}
                                    />
                                }else{
                                    return null
                                }
                            })}
                        </>
                    }

                    {isMessagesLoading &&
                        <Preloader />
                    }
                </div>

                {!!currentDialogId &&
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => {
                            submitSendMessage(values, actions)
                        }}
                    >{formik => {
                        return (
                            <Form className={s.sendMessageBlock}>
                                <CustomField
                                    name={'message'}
                                    fieldType={'textarea'}
                                    placeholder={'Type something besides "ghbdtn" ) '}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                        if (e.key === 'Enter') {
                                            if (!e.shiftKey) {
                                                e.preventDefault()
                                                formik.handleSubmit()
                                            }
                                        }
                                    }}
                                />
                                {formik.errors.general ? <div className={s.formSummaryError}>{formik.errors.general}</div> : null}
                                {!(isMessageFetching || isMessagesLoading) &&
                                    <button type={'submit'} className={cn('button', 'button-success')}>
                                        <img src={sendImg} alt="send message"/>
                                    </button>
                                }
                            </Form>
                        )
                    }}
                    </Formik>
                }

                {(!currentDialogId || !currentUser) &&
                    <div className={s.noDialogMessage}>
                        <span>Choose user to start conversation</span>
                    </div>
                }

            </div>
        </div>
    )
})



export default Dialogs