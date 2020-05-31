import Dialogs from './Dialogs'
import React from 'react'
import {
    actions,
    setUser,
    sendMessage,
    setCurrentUser,
    checkUser
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
import {AppStateType} from "../../redux/redux-store"



type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    setCurrentDialogId: (dialogId: number | null) => void
    setCurrentUser: (userId: number | null) => void
    sendMessage: (userId: number, newMessage: string, date: number) => void
    setUser: (userId: number) => void
    setDialog: (userId: number) => void
    checkUser: (userId: number) => any
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
        // debugger
        const dialogId = this.props.match.params.dialogId
        const dialogIdNumber = Number(dialogId)
        if (dialogId && dialogIdNumber !== this.props.currentDialogId) {
            const promise = new Promise((resolve, reject) => {
                const checkUserExist = this.props.checkUser(dialogIdNumber)
                if(checkUserExist) {
                    resolve('User exist')
                }else{
                    reject('No such user')
                }
            })
            promise
                .then(() => {
                    this.props.setCurrentDialogId(dialogIdNumber)
                })
                .catch(() => {
                    this.props.setCurrentDialogId(null)
                })
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



const mapStateToProps = (state: AppStateType) => {
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
    setCurrentDialogId: actions.setCurrentDialogId,
    setCurrentUser,
    sendMessage,
    setUser,
    setDialog: actions.setDialog,
    checkUser
}



export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect // Protect from non-auth users
)(DialogsContainer)