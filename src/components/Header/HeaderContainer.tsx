import React from 'react'
import Header from './Header'
import {logout} from '../../redux/auth-reducer'
import {connect} from "react-redux"
import {getIsAuth, getLogin} from "../../redux/auth-selectors"
import {AppStateType} from "../../redux/redux-store"



type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToProps = {
    logout: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToProps

class HeaderComponent extends React.PureComponent<PropsType> {

    render() {
        const {isAuth, login, logout} = this.props
        return (
            <Header
                isAuth={isAuth}
                login={login}
                logout={logout}
            />
        )
    }

}



const mapStateToProps = (state: AppStateType) => ({
    isAuth: getIsAuth(state),
    login: getLogin(state),
})

const mapDispatchToProps: MapDispatchToProps = {
    logout
}





export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)