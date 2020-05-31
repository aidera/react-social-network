import React from 'react'
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {AppStateType} from "../redux/redux-store"

/* Use this hoc to pages you want to protect from non-auth users */

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = { }

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>)  {

    const RedirectComponent: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
        const {isAuth, ...restProps} = props

        if(!isAuth) return <Redirect to='/login'/>
        return <WrappedComponent {...restProps as WCP} />

    }

    return connect<MapStateToPropsType, MapDispatchToPropsType, WCP, AppStateType>(mapStateToProps)(RedirectComponent)
}