import React from 'react';
import s from './Message.module.sass';
import cn from 'classnames';



const Message = React.memo(({
                                messageText,
                                from,
                                time,
                                opponent,
                                ...props}) => {



    const timeConverter = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2);
    }

    let opponentName = 'opponent:';
    if(opponent.fullName) {
        opponentName = opponent.fullName+':';
    }

    return (
        <div className={cn(s.message, {[s.myMessage]: from==='me'})}>
            <div className={s.messageInnerContainer}>
                <div className={s.messageFrom}>{from === 'me' ? 'me:' : opponentName}</div>
                <div className={s.messageText}>{messageText}</div>
                <div className={s.time}>{timeConverter(time)}</div>
            </div>
        </div>
    );
})



export default Message;