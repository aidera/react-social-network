import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

/* Use this hoc to pages you want to protect from non-auth users */

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render () {

            if(!this.props.isAuth) return <Redirect to='/login'/>
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToProps)(RedirectComponent);
}