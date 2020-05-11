import React from 'react';
import s from './Message.module.sass';

function Message(props) {
    return (
        <div className={s.message}>
            <div className={s.messageInnerContainer}>
                <div className="messageText">{props.messageText}</div>
            </div>
        </div>
    );
}

export default Message;