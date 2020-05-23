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

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        let date = new Date(timestamp);

        // Hours part from the timestamp
        let hours = date.getHours();

        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        // let seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        let formattedTime = hours + ':' + minutes.substr(-2);

        return formattedTime;
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