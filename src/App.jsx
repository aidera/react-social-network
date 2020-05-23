import React, {Suspense} from 'react';
import './App.sass';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import {getInitialized} from "./redux/app-selectors";
import store from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const ErrorContent = React.lazy(() => import('./components/ErrorContent/ErrorContent'));


class App extends React.Component {

    catchAllUnhandledErrors = (reason, promise) => {
        console.log('Some error occured');
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }


    render() {
        if (!this.props.initialized) {
            return <div className={'preloader-container'}><Preloader/></div>
        }



        // app
        //    - header
        //    - main
        //       - width-wrapper
        //          - content-wrapper
        //             - navbar
        //             - content
        //    - footer


        return (

            <div className='app'>

                <HeaderContainer/>

                <div className="main">
                    <div className="width-wrapper" >
                        <div className="content-wrapper">

                            <Navbar/>

                            <div className="content">
                                <Suspense fallback={<Preloader/>}>

                                    <Switch>

                                        <Route path='/dialogs/:dialogId?'
                                               render={() => <DialogsContainer/>}/>

                                        <Route path='/profile/:userId?'
                                               render={() => <ProfileContainer/>}/>

                                        <Route path='/users'
                                               render={() => <UsersContainer/>}/>

                                        <Route path='/login'
                                               render={() => <LoginContainer/>}/>

                                        <Route path='/news'
                                               render={() => <News/>}/>

                                        <Route path='/music'
                                               render={() => <Music/>}/>

                                        <Route path='/settings'
                                               render={() => <Settings/>}/>

                                        <Route exact path='/'> <Redirect to='/profile'/> </Route>

                                        <Route path='*'
                                               render={() => <ErrorContent
                                                   errorType={404}
                                                   h1={'Page not found'}
                                                   h2={'Sorry, we have lost this page, but... our best detectives are already looking for it!'}
                                                   linkUrl={'/users'}
                                                   linkText={'Get another try'}
                                                   />}
                                        />

                                    </Switch>

                                </Suspense>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />

            </div>


        );
    }
}


let mapStateToProps = (state) => ({
    initialized: getInitialized(state)
})
const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)

const SamuraiJSApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
};

export default SamuraiJSApp;

