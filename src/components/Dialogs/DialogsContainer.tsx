import Dialogs from './Dialogs'
import React from 'react'
import {
    setUser,
    sendMessage,
    setDialog,
    setCurrentDialogId,
    setCurrentUser
} from '../../redux/dialogs-reducer'
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {
    getCurrentDialogId,
    getCurrentUser,
    getDialogs,
    getIsMessageFetching,
    getIsMessagesLoading,
    getMessages,
    getUsers
} from "../../redux/dialogs-selectors"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {Helmet} from "react-helmet"
import {DialogType} from "../../types/Dialog"
import {MessageType} from "../../types/Message"
import {UserType} from "../../types/User"
import {AppStateType} from "../../redux/redux-store"



type MapStateToPropsType = {
    currentDialogId: number | null
    currentUser: UserType | null
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    users: Array<UserType>
    isMessageFetching: boolean
    isMessagesLoading: boolean
}

type MapDispatchToPropsType = {
    setCurrentDialogId: (dialogId: number | null) => void
    setCurrentUser: (userId: number | null) => void
    sendMessage: (userId: number, newMessage: string, date: number) => void
    setUser: (userId: number) => void
    setDialog: (userId: number) => void
}

type PathPropsType = {
    dialogId: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathPropsType>



class DialogsContainer extends React.PureComponent<PropsType>{

    componentDidMount () {
        this.setCurrentDialogIdFromUrl()
        this.setUsersFromDialogsArray(this.props.dialogs)
    }

    componentDidUpdate (prevProps: PropsType) {
        this.setCurrentDialogIdFromUrl()
        if(prevProps.dialogs !== this.props.dialogs){
            this.setUsersFromDialogsArray(this.props.dialogs)
        }
        if(prevProps.currentDialogId !== this.props.currentDialogId){
            this.props.setCurrentUser(this.props.currentDialogId)
        }
    }

    setCurrentDialogIdFromUrl = () => {
        const dialogId = this.props.match.params.dialogId
        const dialogIdNumber = Number(dialogId)
        if (dialogId && dialogIdNumber !== this.props.currentDialogId) {
            this.props.setCurrentDialogId(dialogIdNumber)
        }
        if(!dialogId && dialogIdNumber !== this.props.currentDialogId){
            this.props.setCurrentDialogId(null)
        }
    }



    setUsersFromDialogsArray = (dialogs: Array<DialogType>) => {
        dialogs.forEach(dialog => {
            if(dialog.opponentId){
                this.props.setUser(dialog.opponentId)
            }
        })

    }

    findUserInUsersArray = (userId: number) => {
        let thisUser = null
        if(this.props.users[0]){
            this.props.users.forEach((user) => {
                if(user.userId === userId){
                    thisUser = user
                }
            })
        }

        return thisUser
    }



    render () {
        return (
            <>
                <Helmet>
                    <title>{this.props.currentUser && !this.props.isMessagesLoading ? this.props.currentUser.fullName+' - messages' : 'Dialogs'}</title>
                </Helmet>
                <Dialogs
                    currentDialogId={this.props.currentDialogId}
                    currentUser={this.props.currentUser}
                    dialogs={this.props.dialogs}
                    messages={this.props.messages}
                    users={this.props.users}

                    isMessageFetching={this.props.isMessageFetching}
                    isMessagesLoading={this.props.isMessagesLoading}

                    sendMessage={this.props.sendMessage}
                    setDialog={this.props.setDialog}
                    findUserInUsersArray={this.findUserInUsersArray}
                />
            </>
        )
    }

}



const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        currentDialogId: getCurrentDialogId(state),
        currentUser: getCurrentUser(state),
        dialogs: getDialogs(state),
        messages: getMessages(state),
        users: getUsers(state),
        isMessageFetching: getIsMessageFetching(state),
        isMessagesLoading: getIsMessagesLoading(state)
    }
}

const mapDispatchToProps: MapDispatchToPropsType = {
    setCurrentDialogId,
    setCurrentUser,
    sendMessage,
    setUser,
    setDialog
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect // Protect from non-auth users
)(DialogsContainer) as React.ComponentType<any>