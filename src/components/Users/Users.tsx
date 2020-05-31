import React, {RefObject, useEffect, useRef} from "react"
import s from './Users.module.sass'
import User from "./User/User"
import Preloader from '../common/Preloader/Preloader'
import Paginator from '../common/Paginator/Paginator'
import {UserType} from "../../types/User";



type PropsType = {
    currentPage: number
    totalUsersCount: number
    onPageLimit: number
    isFetching: boolean
    isLoading: boolean
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    isAuth: boolean
    onscrollTargetVisible: (target: RefObject<HTMLDivElement>) => void
}

const Users: React.FC<PropsType> = React.memo(({
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
}) => {



    const onScrollTarget = useRef<HTMLDivElement>(null)


    useEffect(() => {
        window.addEventListener('scroll', function() {
            if(onScrollTarget !== undefined){
                onscrollTargetVisible(onScrollTarget)
            }
        })
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
                            user={user}
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

export default Users