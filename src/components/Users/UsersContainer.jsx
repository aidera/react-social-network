import {
    setCurrentPage,
    requestUsers,
    follow,
    unfollow
} from '../../redux/users-reducer'
import Users from './Users'
import {connect} from "react-redux";
import React from "react";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPagesCount,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";


class UsersContainer extends React.PureComponent {


    componentDidMount() {
        const {requestUsers, currentPage, pageSize} = this.props;
        requestUsers(currentPage, pageSize);
    }

    onPageChange = (pageNumber) => {
        const {requestUsers, pageSize, setCurrentPage} = this.props;
        setCurrentPage(pageNumber);
        requestUsers(pageNumber, pageSize);
    }


    render() {

        const {users,currentPage, pagesCount, isFetching, followingInProgress, follow, unfollow} = this.props;

        return(

            <Users
                    users={users}
                    currentPage={currentPage}
                    pagesCount={pagesCount}
                    onPageChange={this.onPageChange}
                    isFetching={isFetching}
                    followingInProgress={followingInProgress}
                    follow={follow}
                    unfollow={unfollow}
                />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        pagesCount: getPagesCount(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
};


let mapDispatchToPropsObj = {
    setCurrentPage,
    requestUsers,
    follow,
    unfollow,
};


export default connect(mapStateToProps,mapDispatchToPropsObj)(UsersContainer);

