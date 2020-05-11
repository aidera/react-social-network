import React from 'react';
import Header from './Header'
import {logout} from '../../redux/auth-reducer'
import {connect} from "react-redux";
import {getIsAuth, getLogin} from "../../redux/auth-selectors";

class HeaderComponent extends React.PureComponent {

    render() {
        const {isAuth, login, logout} = this.props;
        return (
            <Header
                isAuth={isAuth}
                login={login}
                logout={logout}
            />
        )
    }

}

let mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    login: getLogin(state),
})


export default connect(mapStateToProps, {logout})(HeaderComponent);