import React, {useEffect, useRef} from 'react';
import s from './Dialogs.module.sass';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import cn from 'classnames';
import {CustomField} from "../common/FormsControls/CustomFormControls";
import {Form, Formik} from "formik";
import sendImg from '../../assets/images/send-message_white.svg';
import arrowBackImg from '../../assets/images/arrow-left.svg';
import Preloader from "../common/Preloader/Preloader";



const Dialogs = React.memo(({
                                dialogs,
                                messages,
                                users,
                                sendMessage,
                                setDialog,
                                currentDialog,
                                userFromUrl,
                                getUsersFromDialogs,
                                isMessageFetching,
                                isMessagesLoading,
                                findUserInUsersArray,
                                ...props
                            }) => {


    const submitSendMessage = (values, actions) => {
        if (values.message.length > 0 && isMessageFetching === false && isMessagesLoading === false) {
            let promise = new Promise(async (resolve, reject) => {
                let response = await sendMessage(currentDialog, values.message, Date.now())
                if(response === true){
                    resolve(null)
                }else{
                    reject('Sorry, there is no such user')
                }
            })
            promise
                .then(() => {
                    dialogsScrollTo();
                    actions.resetForm({message: ''})
                })
                .catch((error) => {
                    actions.setFieldError('general', error);
                })
        }
    }


    /* Scrolls down all messages after sending one and in the beginning */
    const dialogsScrollToRef = useRef();

    const dialogsScrollTo = () => {
        dialogsScrollToRef.current.scrollTo(0,dialogsScrollToRef.current.scrollHeight);
    }

    useEffect(()=>{
        dialogsScrollTo();
    })


    /* Mobile versions animation */
    const dialogsListRef = useRef();
    const showDialogsListRef = useRef();

    const showDialogs = () => {
        dialogsListRef.current.style.left = 0
        showDialogsListRef.current.style.left = '200%'
    }
    const hideDialogs = () => {
        dialogsListRef.current.style.left = '-100%';
        showDialogsListRef.current.style.left = 0
    }

    useEffect(()=>{
        if(!!currentDialog){
            hideDialogs();
        }
    }, [currentDialog])



    return (
        <div className={s.dialogs}>

            <div ref={showDialogsListRef} onClick={showDialogs} className={s.showDialogsList}>
                <img src={arrowBackImg} alt="show dialogs"/>
                <span>{!isMessagesLoading && userFromUrl.fullName}</span>
            </div>

            <div ref={dialogsScrollToRef} className={s.dialogsContainer}>

                <div ref={dialogsListRef} onClick={hideDialogs} className={s.dialogsList}>
                    {dialogs.map(dialog => {
                        return <Dialog
                            key={dialog.id}
                            user={findUserInUsersArray(dialog.opponentId)}
                        />
                    })}
                </div>

                <div className={s.userName}>{!(isMessageFetching || isMessagesLoading) && userFromUrl.fullName}</div>

                <div className={s.messagesList}>
                    {!isMessagesLoading &&
                        <>
                            {messages.map(message => {
                                if (message.opponentId === currentDialog) {
                                    return <Message
                                        key={message.id}
                                        opponent={findUserInUsersArray(message.opponentId)}
                                        from={message.from}
                                        messageText={message.messageText}
                                        time={message.time}
                                    />
                                }else{
                                    return null
                                }
                            })}
                        </>
                    }

                    {!!isMessagesLoading &&
                        <Preloader />
                    }
                </div>

                {!!currentDialog &&
                    <Formik
                        initialValues={{
                            message: ''
                        }}
                        onSubmit={(values, actions, ...props) => {
                            submitSendMessage(values, actions);
                        }}
                    >{formik => {
                        return (
                            <Form className={s.sendMessageBlock}>
                                <CustomField
                                    name={'message'}
                                    fieldType={'textarea'}
                                    placeholder={'Type something besides "ghbdtn" ;) '}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if (!e.shiftKey) {
                                                e.preventDefault();
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
                        );
                    }}
                    </Formik>
                }

                {!currentDialog &&
                    <div className={s.noDialogMessage}>
                        <span>Choose user to start conversation</span>
                    </div>
                }

            </div>
        </div>
    );
});



export default Dialogs;