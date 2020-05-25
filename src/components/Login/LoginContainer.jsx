import React from "react";
import Login from './Login';
import {login, setIsLoading} from '../../redux/auth-reducer'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getIsAuth, getCaptchaUrl, getIsLoading} from "../../redux/auth-selectors";
import {Helmet} from "react-helmet";



class LoginContainer extends React.PureComponent {

    render () {
        const {isAuth, login, captchaUrl,isLoading} = this.props;

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



let mapStateToProps = (state) =>( {
    isAuth: getIsAuth(state),
    captchaUrl: getCaptchaUrl(state),
    isLoading: getIsLoading(state)
});
let mapDispatchToProps = {
    login,
    setIsLoading
};



export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);