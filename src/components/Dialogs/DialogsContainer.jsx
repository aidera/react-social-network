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



class DialogsContainer extends React.PureComponent{

    state = {
        currentDialog: Number(this.props.match.params.dialogId),
        userFromUrl: false,
        users: this.props.users
    }

    /* Checking for dialogId in URL. If it's not - then use default page */
    refreshDialogs = () => {
        let dialogId = Number(this.props.match.params.dialogId);
        this.setState({
            currentDialog: dialogId
        });

    }

    /* To check URL in messages-block and then show user name or error  */
    checkUserFromUrl = () => {
        if(!!this.state.currentDialog) {
            this.props.getUserFromServer(this.state.currentDialog)
                .then((response) => {
                    console.log(response)
                    this.setState({
                        userFromUrl: response
                    });
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({
                        userFromUrl: false
                    });
                })
        }
    }

    /* We have dialogs arr in our reducer. We need to map each dialog for userId and get him from the server*/
    getUsersFromDialogs = (dialogs) => {
        dialogs.forEach(dialog => {
            if(dialog.opponentId){
                this.props.setUser(dialog.opponentId)
            }
        })

    }





    componentDidMount () {
        this.refreshDialogs();
        this.checkUserFromUrl();
        this.getUsersFromDialogs(this.props.dialogs);

    }

    componentDidUpdate (prevProps, prevState) {
        this.refreshDialogs();
        if(prevProps.dialogs !== this.props.dialogs){
            this.getUsersFromDialogs(this.props.dialogs);
        }
        if(prevState.currentDialog !== this.state.currentDialog){
            this.checkUserFromUrl();
        }

    }

    render () {
        return (
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
            />
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