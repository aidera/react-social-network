import Profile from './Profile';
import React from "react";
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfileInfo,
} from '../../redux/profile-reducer'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    getIsLoadingAvatar,
    getIsLoadingStatus,
    getLoadingProfileInfoChanges,
    getProfile,
    getStatus
} from "../../redux/profile-selectors";
import {getIsAuth, getUserId} from "../../redux/auth-selectors";
import {Helmet} from "react-helmet";



class ProfileContainer extends React.PureComponent {

    componentDidMount() {
        this.loadProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.userId !== this.props.match.params.userId || prevProps.isAuth !== this.props.isAuth){
            this.loadProfile();
        }
    }

    loadProfile = () => {
        const {getUserProfile, authUserId} = this.props;

        let userId = this.props.match.params.userId;
        if(!userId){
            userId = authUserId
            if(!userId){
                this.props.history.push("/login");
            }
        }
        getUserProfile(userId);
    }



    render () {

        return (
            <>
                <Helmet>
                    <title>{!!this.props.profile ? this.props.profile.fullName+' - Profile' : 'Profile'}</title>
                </Helmet>
                <Profile
                    isOwner={!this.props.match.params.userId}

                    profile={this.props.profile}
                    isLoadingProfileInfoChanges={this.props.isLoadingProfileInfoChanges}
                    saveProfileInfo={this.props.saveProfileInfo}

                    status={this.props.status}
                    isLoadingStatus={this.props.isLoadingStatus}
                    updateUserStatus={this.props.updateUserStatus}

                    isLoadingAvatar={this.props.isLoadingAvatar}
                    savePhoto={this.props.savePhoto}

                />
            </>
        )
    }
}



let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    isLoadingStatus: getIsLoadingStatus(state),
    isLoadingAvatar:getIsLoadingAvatar(state),
    isLoadingProfileInfoChanges: getLoadingProfileInfoChanges(state),
    isAuth: getIsAuth(state),
    authUserId: getUserId(state)
});



export default compose(
    connect(mapStateToProps,{getUserProfile,getUserStatus,updateUserStatus,savePhoto,saveProfileInfo}),
    withRouter,
)(ProfileContainer)