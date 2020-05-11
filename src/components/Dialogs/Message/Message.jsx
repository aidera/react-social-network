import React from 'react';
import s from './Message.module.sass';

const Message = React.memo(({messageText, ...props}) => {
    return (
        <div className={s.message}>
            <div className={s.messageInnerContainer}>
                <div className="messageText">{messageText}</div>
            </div>
        </div>
    );
})

export default Message;