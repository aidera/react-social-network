import React, {useEffect} from 'react';
import s from './Dialogs.module.sass';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import cn from 'classnames';
import {CustomField} from "../common/FormsControls/CustomFormControls";
import {ErrorMessage, Form, Formik} from "formik";
import sendImg from '../../assets/images/send-message_white.svg';


const Dialogs = React.memo(({
                                dialogs,
                                messages,
                                users,
                                sendMessage,
                                currentUser,
                                ...props
                            }) => {


    const dialogsScrollTo = () => {
        document.getElementById('dialogsScrollToRef').scrollTo(0,document.body.scrollHeight);
    }



    useEffect(()=>{
        dialogsScrollTo()
    })

    return (
        <div className={s.dialogs}>
            <div id={'dialogsScrollToRef'} className={s.dialogsContainer}>
                <div className={s.dialogsList}>

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
                                if(user.userId === message.opponentId){
                                    newUser = user;
                                }
                            })

                            return <Message
                                key={message.id}
                                messageId={message.id}
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

            </div>
        </div>
    );
});


export default Dialogs;