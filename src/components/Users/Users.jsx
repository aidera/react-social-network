import React, {useEffect, useRef} from "react";
import s from './Users.module.sass'
import User from "./User/User";
import Preloader from './../common/Preloader/Preloader';
import Paginator from '../common/Paginator/Paginator';


const Users = React.memo(({
                              currentPage,
                              totalUsersCount,
                              onPageLimit,
                              isFetching,
                              isLoading,
                              users,
                              follow,
                              unfollow,
                              followingInProgress,
                              isAuth,
                              onscrollTargetVisible,
                              ...props}) => {



    const onScrollTarget = useRef();


    useEffect(() => {
        window.addEventListener('scroll', function() {
            onscrollTargetVisible(onScrollTarget);
        });
    },[onscrollTargetVisible] )



    return (
        <>
            {!isLoading &&
                <div className={s.usersPage}>
                    <h1>Users</h1>
                    <div className={s.buttons}>

                        <Paginator
                            pageLink={'/users'}
                            totalElementsCount={totalUsersCount}
                            onPageLimit={onPageLimit}
                            currentPage={currentPage}
                        />

                    </div>

                    {users.map(user => {
                        return <User
                            key={user.id}
                            state={user}
                            follow={follow}
                            unfollow={unfollow}
                            followingInProgress={followingInProgress}
                            isAuth={isAuth}
                        />
                        }
                    )}
                    <div ref={onScrollTarget} className={s.scrollElem}/>
                    {isFetching &&
                        <Preloader/>
                    }
                </div>
            }

            {isLoading &&
                <Preloader/>
            }
        </>

    )
})

export default Users;