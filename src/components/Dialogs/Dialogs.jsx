import React from 'react';
import s from './Dialogs.module.sass';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';


function Dialogs(props) {


    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.sendMessage();
    }

    let messageWriting = (e) => {
        let text = e.target.value;

        props.updateNewMessageText(text);
    }


    

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsList}>

                { props.dialogsPage.dialogs.map( dialog => (
                    <Dialog key={dialog.id} name={dialog.name} userID={dialog.id} />
                )) }

            </div>
            <div className={s.messagesList}>
                
                { props.dialogsPage.messages.map( message => (
                    <Message key={message.id} messageID={message.id} from={message.from} messageText={message.messageText} />
                )) }

                <div className={s.sendMessageBlock}>
                    <textarea 
                        ref={newMessageElement}
                        onChange={ messageWriting } 
                        value={props.dialogsPage.messageWritingText}
                    />
                    <button 
                        className='button'
                        onClick={ addMessage }
                    >Send</button>
                </div>
        
            </div>
        </div>
    );
}

export default Dialogs;