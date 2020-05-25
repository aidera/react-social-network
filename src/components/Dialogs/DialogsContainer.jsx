import Dialogs from './Dialogs';
import React from 'react';
import {setUser, sendMessage, setDialog, getUserFromServer} from '../../redux/dialogs-reducer'
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getDialogs,
    getIsMessageFetching,
    getIsMessagesLoading,
    getMessages,
    getUsers
} from "../../redux/dialogs-selectors";
import {withRouter} from "react-router-dom";
import {Helmet} from "react-helmet";



class DialogsContainer extends React.PureComponent{

    state = {
        currentDialog: Number(this.props.match.params.dialogId),
        userFromUrl: false
    }

    componentDidMount () {
        this.setCurrentDialogFromUrl();
        this.checkUserFromCurrentDialog();
        this.setUsersFromDialogsArray(this.props.dialogs);

    }

    componentDidUpdate (prevProps, prevState) {
        this.setCurrentDialogFromUrl();
        if(prevState.currentDialog !== this.state.currentDialog){
            this.checkUserFromCurrentDialog();
        }
        if(prevProps.dialogs !== this.props.dialogs){
            this.setUsersFromDialogsArray(this.props.dialogs);
        }
    }

    setCurrentDialogFromUrl = () => {
        let dialogId = Number(this.props.match.params.dialogId);
        this.setState({
            currentDialog: dialogId
        });

    }

    checkUserFromCurrentDialog = () => {
        if(!!this.state.currentDialog) {
            this.props.getUserFromServer(this.state.currentDialog)
                .then((response) => {
                    this.setState({
                        userFromUrl: response
                    });
                })
                .catch((error) => {
                    this.setState({
                        userFromUrl: false
                    });
                })
        }
    }

    setUsersFromDialogsArray = (dialogs) => {
        dialogs.forEach(dialog => {
            if(dialog.opponentId){
                this.props.setUser(dialog.opponentId)
            }
        })

    }

    findUserInUsersArray = (userId) => {
        let thisUser = '';
        this.props.users.forEach((user) => {
            if(user.userId === userId){
                thisUser = user;
            }
        })
        return thisUser;
    }



    render () {
        return (
            <>
                <Helmet>
                    <title>{!!this.state.userFromUrl && this.props.isMessagesLoading === false ? this.state.userFromUrl.fullName+' - messages' : 'Dialogs'}</title>
                </Helmet>
                <Dialogs
                    currentDialog={this.state.currentDialog}
                    userFromUrl={this.state.userFromUrl}
                    dialogs={this.props.dialogs}
                    messages={this.props.messages}
                    users={this.props.users}
                    sendMessage={this.props.sendMessage}
                    setDialog={this.props.setDialog}
                    getUsersFromDialogs={this.props.getUsersFromDialogs}
                    isMessageFetching={this.props.isMessageFetching}
                    isMessagesLoading={this.props.isMessagesLoading}
                    findUserInUsersArray={this.findUserInUsersArray}
                />
            </>
        );
    }

}



let mapStateToProps = (state) => {
    return {
        dialogs: getDialogs(state),
        messages: getMessages(state),
        users: getUsers(state),
        isMessageFetching: getIsMessageFetching(state),
        isMessagesLoading: getIsMessagesLoading(state)
    }
};



export default compose(
    connect(mapStateToProps,{sendMessage, setUser, setDialog, getUserFromServer}),
    withRouter,
    withAuthRedirect // Protect from non-auth users
)(DialogsContainer);