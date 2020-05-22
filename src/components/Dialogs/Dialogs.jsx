import React, {useEffect} from 'react';
import s from './Dialogs.module.sass';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import cn from 'classnames';
import {CustomField} from "../common/FormsControls/CustomFormControls";
import {Form, Formik} from "formik";
import sendImg from '../../assets/images/send-message_white.svg';
import arrowBackImg from '../../assets/images/arrow-left.svg';


const Dialogs = React.memo(({
                                dialogs,
                                messages,
                                users,
                                sendMessage,
                                currentDialog,
                                ...props
                            }) => {




    const dialogsScrollTo = () => {
        document.getElementById('dialogsScrollToRef').scrollTo(0,document.getElementById('dialogsScrollToRef').scrollHeight);
    }


    const showDialogs = () => {
        document.getElementsByClassName(s.dialogsList)[0].style.left = 0
        document.getElementsByClassName(s.showDialogsList)[0].style.left = '200%'
    }
    const hideDialogs = () => {
        document.getElementsByClassName(s.dialogsList)[0].style.left = '-100%';
        document.getElementsByClassName(s.showDialogsList)[0].style.left = 0
    }



    useEffect(()=>{
        dialogsScrollTo();
    })

    return (
        <div className={s.dialogs}>
            <div onClick={showDialogs} className={s.showDialogsList}>
                <img src={arrowBackImg} alt="show dialogs"/>
                <span>Show other conversations</span>
            </div>
            <div id={'dialogsScrollToRef'} className={s.dialogsContainer}>


                <div onClick={hideDialogs} className={s.dialogsList}>

                    {dialogs.map(dialog => {

                        let usersCopy = [...users];
                        let newUser = '';
                        usersCopy.forEach((user) => {
                            if(user.userId === dialog.opponentId){
                                newUser = user;
                            }
                        })

                        return <Dialog
                            key={dialog.id}
                            dialogId={dialog.id}
                            user={newUser}
                        />

                    })}

                </div>
                <div className={s.messagesList}>

                    {messages.map(message => {

                        if (message.dialogId === currentDialog) {
                            
                            let dialogsCopy = [...dialogs];
                            let newDialog = null;
                            dialogsCopy.forEach((dialog) => {

                                if(dialog.id === message.dialogId){
                                    newDialog = dialog;
                                }
                            })

                            let usersCopy = [...users];
                            let newUser = '';

                            if(newDialog){
                                usersCopy.forEach((user) => {

                                    if(user.userId === newDialog.opponentId){
                                        newUser = user;
                                    }
                                })
                            }




                            return <Message
                                key={message.id}
                                messageId={message.id}
                                opponent={newUser}
                                from={message.from}
                                messageText={message.messageText}
                                dialogId={message.dialogId}
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