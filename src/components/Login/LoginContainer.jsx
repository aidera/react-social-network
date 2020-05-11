import React from "react";
import Login from './Login';
import {login} from '../../redux/auth-reducer'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getIsAuth} from "../../redux/auth-selectors";



class LoginContainer extends React.PureComponent {

    render () {
        const {isAuth, login} = this.props;

        if(isAuth){
            return <Redirect to={'/profile'}/>
        }
        return(
            <Login
                login={login}
            />
        )

    }
}


let mapStateToProps = (state) =>( {
    isAuth: getIsAuth(state)
});
let mapDispatchToProps = {
    login
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);