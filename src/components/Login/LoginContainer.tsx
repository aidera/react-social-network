import React from "react"
import Login from './Login'
import {login} from '../../redux/auth-reducer'
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {getIsAuth, getCaptchaUrl, getIsLoading} from "../../redux/auth-selectors"
import {Helmet} from "react-helmet"
import {AppStateType} from "../../redux/redux-store"



type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => any
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class LoginContainer extends React.PureComponent<PropsType> {

    render () {
        const {isAuth, login, captchaUrl, isLoading} = this.props

        if(isAuth){
            return <Redirect to={'/profile'}/>
        }
        return(
            <>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <Login
                    login={login}
                    captchaUrl={captchaUrl}
                    isLoading={isLoading}
                />
            </>
        )

    }
}



const mapStateToProps = (state: AppStateType) =>( {
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state),
    isLoading: getIsLoading(state)
})

const mapDispatchToProps: MapDispatchToPropsType = {
    login
}



export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)