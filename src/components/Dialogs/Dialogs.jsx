import React, {useEffect, useRef} from 'react';
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
                                currentUser,
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
        dialogsScrollTo()
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
                            user={newUser}
                            userId={dialog.opponentId}
                            currentUser={currentUser}
                        />

                    })}

                </div>
                <div className={s.messagesList}>

                    {messages.map(message => {

                        if (message.dialogId === currentUser) {



                            let usersCopy = [...users];
                            let newUser = '';
                            usersCopy.forEach((user) => {
                                if(user.userId === currentUser){
                                    newUser = user;
                                }
                            })

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
                {!!currentUser &&
                <Formik
                    initialValues={{
                        message: ''
                    }}
                    onSubmit={(values, actions, ...props) => {
                        if (values.message.length > 0) {
                            let promise = new Promise((resolve, reject) => {
                                sendMessage(currentUser, values.message, Date.now())
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
                {!currentUser &&
                    <div className={s.noDialogMessage}>
                        <span>Choose user to start conversation</span>
                    </div>
                }

            </div>
        </div>
    );
});


export default Dialogs;