import React from "react";
import s from './Users.module.sass'
import User from "./User/User";
import Preloader from './../common/Preloader/Preloader';
import Paginator from '../common/Paginator/Paginator';


const Users = React.memo(({
                              onPageChange,
                              currentPage,
                              pagesCount,
                              isFetching,
                              users,
                              follow,
                              unfollow,
                              followingInProgress,
                              ...props}) => {


    return (
        <>
            {isFetching === false ?
                <div className={s.usersPage}>
                    <h1>Users</h1>
                    <div className={s.buttons}>

                        <Paginator currentPage={currentPage} pagesCount={pagesCount} onPageChange={onPageChange}  />

                    </div>
                    {
                        users.map(user => {
                                return <User
                                    key={user.id}
                                    state={user}
                                    follow={follow}
                                    unfollow={unfollow}
                                    followingInProgress={followingInProgress}
                                />
                            }
                        )
                    }
                    <button className="button">Get Users</button>
                </div> : <Preloader/>
            }



        </>

    )
})

export default Users;