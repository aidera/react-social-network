import {
    requestUsers,
    follow,
    unfollow, requestAddUsers, setIsLoading
} from '../../redux/users-reducer'
import Users from './Users'
import {connect} from "react-redux";
import React from "react";
import {
    getFollowingInProgress,
    getIsFetching, getIsLoading, getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {getIsAuth} from "../../redux/auth-selectors";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import * as qs from 'query-string';


class UsersContainer extends React.PureComponent {


    state = {
        defaultCurrentPage: 1,
        currentPage: 0,
        defaultOnPageLimit: 5,
        onPageLimit: 0,

        currentLoadedPage: 0,
        debounceOperator: false
    }

    // We need to return promise for requestUsers function in lifecycles
    getUrlParams = () => {
        return new Promise((resolve) => {
            // get string from url
            const urlQuery = this.props.location.search;
            // parse it
            let  parsedUrlQuery = qs.parse(urlQuery,{ ignoreQueryPrefix: true })
            // convert to number
            parsedUrlQuery.page = Number(parsedUrlQuery.page);
            parsedUrlQuery.limit = Number(parsedUrlQuery.limit);
            // set page and limit to state
            this.setState({
                currentPage: parsedUrlQuery.page || this.state.defaultCurrentPage,
                onPageLimit: parsedUrlQuery.limit || this.state.defaultOnPageLimit,
            }, () => {
                return resolve(null);
            })
        })
    }

    requestUsers = () => {
        this.props.requestUsers(this.state.currentPage, this.state.onPageLimit);
    }


    onscrollTargetVisible = (target) => {

        if(target.current){
            // Element position
            let targetPosition = {
                    top: window.pageYOffset + target.current.getBoundingClientRect().top,
                },
                // Window position
                windowPosition = {
                    top: window.pageYOffset + window.innerHeight
                };

            if (targetPosition.top < windowPosition.top) {

                // We can see element
                if(this.state.debounceOperator === false){
                    this.setState({debounceOperator: true})

                    // Set current loaded page content
                    let pagesCount = Math.ceil(this.props.totalUsersCount/this.state.onPageLimit)

                    if(this.state.currentLoadedPage < pagesCount) { // Fixing last-page bug

                        this.props.requestAddUsers(this.state.currentLoadedPage + 1, this.state.onPageLimit)
                            .then(() => {
                                this.setState({
                                    currentLoadedPage: this.state.currentLoadedPage + 1,
                                    debounceOperator: false
                                })
                            })

                    }else{
                        this.setState({debounceOperator: false })
                    }

                }
            }
        }

    };


    componentDidMount() {
        this.getUrlParams()
            .then(() => {
                this.requestUsers();
                this.setState({currentLoadedPage: this.state.currentPage})
            })


    }


    componentDidUpdate(prevProps, prevState) {
        this.getUrlParams()
            .then(() => {
                if(prevState.currentPage !== this.state.currentPage || prevState.onPageLimit !== this.state.onPageLimit ){
                    this.setState({currentLoadedPage: this.state.currentPage});
                    this.requestUsers();
                }
            })

    }


    render() {

        const {users, isFetching, isLoading, followingInProgress, follow, unfollow, isAuth, totalUsersCount} = this.props;

        return(

            <Users
                    users={users}
                    currentPage={this.state.currentPage}
                    totalUsersCount={totalUsersCount}
                    onPageLimit={this.state.onPageLimit}
                    onscrollTargetVisible={this.onscrollTargetVisible}
                    isFetching={isFetching}
                    isLoading={isLoading}
                    followingInProgress={followingInProgress}
                    follow={follow}
                    unfollow={unfollow}
                    isAuth={isAuth}
                    requestUsers={this.props.requestUsers}
                    requestAddUsers={this.props.requestAddUsers}
                />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        isFetching: getIsFetching(state),
        isLoading: getIsLoading(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
    }
};


let mapDispatchToPropsObj = {
    requestUsers,
    requestAddUsers,
    follow,
    unfollow,
    setIsLoading
};


export default compose(
    connect(mapStateToProps,mapDispatchToPropsObj),
    withRouter,
)(UsersContainer);

