import Profile from './Profile'
import React from "react"
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfileInfo,
} from '../../redux/profile-reducer'
import {connect} from "react-redux"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {compose} from "redux"
import {
    getIsLoadingAvatar,
    getIsLoadingStatus,
    getLoadingProfileInfoChanges,
    getProfile,
    getStatus
} from "../../redux/profile-selectors"
import {getIsAuth, getUserId} from "../../redux/auth-selectors"
import {Helmet} from "react-helmet"
import {AppStateType} from "../../redux/redux-store"
import {UserContactsType} from "../../types/User"





type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToProps = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string | null) => void
    savePhoto: (file: File) => void
    saveProfileInfo: (profileInfo: {
        aboutMe: string | null
        lookingForAJob: boolean
        lookingForAJobDescription: string | null
        fullName: string,
        contacts: UserContactsType
    }) => any
}

type OwnPropsType = {
    authUserId: number | null
}

type PathPropsType = {
    userId: string
}

type PropsType = MapStateToPropsType & MapDispatchToProps & OwnPropsType & RouteComponentProps<PathPropsType>

class ProfileContainer extends React.PureComponent<PropsType> {

    componentDidMount() {
        this.loadProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if(prevProps.match.params.userId !== this.props.match.params.userId || prevProps.isAuth !== this.props.isAuth){
            this.loadProfile()
        }
    }

    loadProfile = () => {
        const {getUserProfile, authUserId} = this.props
        const userId = this.props.match.params.userId
        const userIdNumber = Number(userId)
        if(!userId){
            if(authUserId){
                getUserProfile(authUserId)
            }else{
                this.props.history.push("/login")
            }

        }else{
            getUserProfile(userIdNumber)
        }

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



const mapStateToProps = (state: AppStateType) => ({
    profile: getProfile(state),
    status: getStatus(state),
    isLoadingStatus: getIsLoadingStatus(state),
    isLoadingAvatar:getIsLoadingAvatar(state),
    isLoadingProfileInfoChanges: getLoadingProfileInfoChanges(state),
    isAuth: getIsAuth(state),
    authUserId: getUserId(state)
})

const mapDispatchToProps: MapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfileInfo
}



export default compose<React.ComponentType>(
    connect(mapStateToProps,mapDispatchToProps),
    withRouter,
)(ProfileContainer)