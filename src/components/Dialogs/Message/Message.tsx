import React from 'react'
import s from './Message.module.sass'
import cn from 'classnames'
import {ProfileType} from "../../../types/Profile"



type PropsType = {
    messageText: string
    from: string
    date: number
    opponent: ProfileType | null
}

const Message: React.FC<PropsType> = React.memo(({
                                messageText,
                                from,
                                date,
                                opponent
                                }) => {



    const timeConverter = (timestamp: number) => {
        const date = new Date(timestamp)
        const hours = date.getHours()
        const minutes = "0" + date.getMinutes()
        return hours + ':' + minutes.substr(-2)
    }

    let opponentName = 'opponent:'
    if(opponent) {
        opponentName = opponent.fullName+':'
    }

    return (
        <div className={cn(s.message, {[s.myMessage]: from==='me'})}>
            <div className={s.messageInnerContainer}>
                <div className={s.messageFrom}>{from === 'me' ? 'me:' : opponentName}</div>
                <div className={s.messageText}>{messageText}</div>
                <div className={s.time}>{timeConverter(date)}</div>
            </div>
        </div>
    )
})



export default Message