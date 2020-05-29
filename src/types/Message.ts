import {UserType} from "./User";

export type MessageType = {
    id: number
    // opponent?: UserType
    opponentId: number
    date: number
    from: string
    messageText: string
}