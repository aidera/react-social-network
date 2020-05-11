import React from 'react';
import s from './Dialogs.module.sass';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


let maxLength100 = maxLengthCreator(100);



const Dialogs = React.memo(({dialogs, messages, ...props}) => {


    let addNewMessage = (values) => {
        props.sendMessage(values.sendMessageTextarea)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>

                { dialogs.map( dialog => (
                    <Dialog key={dialog.id} name={dialog.name} userID={dialog.id} />
                )) }

            </div>
            <div className={s.messagesList}>
                
                { messages.map( message => (
                    <Message key={message.id} messageID={message.id} from={message.from} messageText={message.messageText} />
                )) }

                <SendMessageFormRedux onSubmit={addNewMessage} />
        
            </div>
        </div>
    );
});


const SendMessageForm = React.memo(({handleSubmit, ...props}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={s.sendMessageBlock}>
                    <Field
                        name={'sendMessageTextarea'}
                        component={Textarea}
                        placeholder={'write your message'}
                        validate={[required,maxLength100]}
                    />
                <button
                    className='button'
                >Send</button>
            </div>
        </form>
    );
});

const SendMessageFormRedux = reduxForm({form: 'sendMessageForm'})(SendMessageForm);



export default Dialogs;