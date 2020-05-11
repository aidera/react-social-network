import React from 'react';
import './App.sass';
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import {Route} from 'react-router-dom';

function App(props) {

    
    return (
        
        <div className='app-wrapper'>
            <Header />
            <Navbar />

            <div className="app-wrapper-content">

                <Route path='/dialogs' 
                    render={() => <DialogsContainer />}/>
                
                <Route exact path='/profile' 
                    render={() => <Profile />}/>

                <Route exact path='/users'
                       render={() => <UsersContainer /> }/>

                <Route exact path='/news' 
                    component={News}/>
                
                <Route exact path='/music' 
                    component={Music}/>
                
                <Route exact path='/settings' 
                    component={Settings}/>

            </div>
            
        </div>


    );
}


export default App;
