import Profile from './Profile';
import React from "react";
import {getUserProfile,getUserStatus,updateUserStatus} from '../../redux/profile-reducer'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getProfile, getStatus} from "../../redux/profile-selectors";
import {getIsAuth, getUserId} from "../../redux/auth-selectors";


class ProfileContainer extends React.PureComponent {

    componentDidMount() {
        const {getUserProfile, getUserStatus, authUserId} = this.props;

        let userId = this.props.match.params.userId;
        if(!userId){
            userId = authUserId
            if(!userId){
                this.props.history.push("/login");
            }
        }

        getUserProfile(userId);
        getUserStatus(userId);

    }

    render () {

        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateUserStatus={this.props.updateUserStatus}
            />
        )
    }
}


let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    isAuth: getIsAuth(state),
    authUserId: getUserId(state)
});




export default compose(
    connect(mapStateToProps,{getUserProfile,getUserStatus,updateUserStatus}),
    withRouter,
)(ProfileContainer)
