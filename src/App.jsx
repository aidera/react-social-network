import React, {Suspense} from 'react';
import './App.sass';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {getInitialized} from "./redux/app-selectors";
import store from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar';

// import ProfileContainer from './components/Profile/ProfileContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import UsersContainer from './components/Users/UsersContainer';
// import LoginContainer from "./components/Login/LoginContainer";
// import News from './components/News/News';
// import Music from './components/Music/Music';
// import Settings from './components/Settings/Settings';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));


class App extends React.Component {


    componentDidMount() {
        this.props.initializeApp();
    }


    render(){
        if(!this.props.initialized){
            return <Preloader />
        }


        return (

            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />

                <div className="app-wrapper-content">

                    <Suspense fallback={<Preloader/>}>

                        <Route path='/dialogs'
                               render={() => <DialogsContainer />}/>

                        <Route path='/profile/:userId?'
                            render={() => <ProfileContainer />}/>

                        <Route exact path='/users'
                               render={() => <UsersContainer /> }/>

                        <Route exact path='/login'
                               render={() => <LoginContainer />} />

                        <Route exact path='/news'
                               render={() => <News />} />

                        <Route exact path='/music'
                               render={() => <Music />} />

                        <Route exact path='/settings'
                               render={() => <Settings />} />

                    </Suspense>

                </div>

            </div>


        );
    }
}


let mapStateToProps = (state) => ({
    initialized: getInitialized(state)
})
const AppContainer = compose(
    withRouter,
    connect(mapStateToProps,{initializeApp})
)(App)

const SamuraiJSApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default SamuraiJSApp;

