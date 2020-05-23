import React, {useEffect, useRef} from 'react';
import s from './Dialogs.module.sass';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import cn from 'classnames';
import {CustomField} from "../common/FormsControls/CustomFormControls";
import {Form, Formik} from "formik";
import sendImg from '../../assets/images/send-message_white.svg';
import arrowBackImg from '../../assets/images/arrow-left.svg';



/* Becomes fixed in mobile versions */
const Dialogs = React.memo(({
                                dialogs,
                                messages,
                                users,
                                sendMessage,
                                setDialog,
                                currentDialog,
                                ...props
                            }) => {



    /* Scroll down all messages after sending one and in the beginning */
    const dialogsScrollToRef = useRef();

    const dialogsScrollTo = () => {
        dialogsScrollToRef.current.scrollTo(0,dialogsScrollToRef.current.scrollHeight);
    }


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
        dialogsScrollTo();
    })




    return (
        <div className={s.dialogs}>

            <div ref={showDialogsListRef} onClick={showDialogs} className={s.showDialogsList}>
                <img src={arrowBackImg} alt="show dialogs"/>
                <span>Show other conversations</span>
            </div>

            <div ref={dialogsScrollToRef} className={s.dialogsContainer}>

                <div ref={dialogsListRef} onClick={hideDialogs} className={s.dialogsList}>

                    {dialogs.map(dialog => {

                        // Searching for user in our dialogs array
                        let newUser = '';
                        users.forEach((user) => {
                            if(user.userId === dialog.opponentId){
                                newUser = user;
                            }
                        })

                        return <Dialog
                            key={dialog.id}
                            user={newUser}
                        />

                    })}

                </div>
                <div className={s.messagesList}>

                    {messages.map(message => {

                        if (message.opponentId === currentDialog) {

                            // Searching for user in our dialogs array
                            let newUser = '';
                            if(message.opponentId){
                                users.forEach((user) => {
                                    if(user.userId === message.opponentId){
                                        newUser = user;
                                    }
                                })
                            }


                            return <Message
                                key={message.id}
                                opponent={newUser}
                                from={message.from}
                                messageText={message.messageText}
                                time={message.time}
                            />
                        }
                        return null
                    })}
                </div>

                {!!currentDialog &&
                <Formik
                    initialValues={{
                        message: ''
                    }}


                    onSubmit={(values, actions, ...props) => {

                        if (values.message.length > 0) {

                            let promise = new Promise((resolve, reject) => {
                                sendMessage(currentDialog, values.message, Date.now())
                                dialogsScrollTo();

                                let isNewDialog = true;
                                dialogs.forEach((dialog) => {
                                    if(dialog.opponentId === currentDialog){
                                        isNewDialog = false;
                                    }
                                })
                                if(isNewDialog === true){
                                    setDialog(currentDialog)
                                }

                                return resolve(null)
                            })
                            promise
                                .then(() => {
                                    actions.resetForm({message: ''})
                                })
                                .catch((error) => {
                                    actions.setFieldError('general', error);
                                })

                        }

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
                            {/*<ErrorMessage name={'general'}/>*/}
                            <button type={'submit'} className={cn('button', 'button-success')}><img src={sendImg}
                                                                                                    alt="send message"/>
                            </button>
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