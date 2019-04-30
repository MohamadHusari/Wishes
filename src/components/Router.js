import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// import Landing from './Landing';
import LoginPage from './LoginPage';
import Navbar from './Navbar'
import Header from './Header';
import ProfilePage from './ProfilePage';
import PrivateRoute from './PrivateRoute';
import EventPage from './EventPage';


const Router = ()=> {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Header} />
                <Navbar />
            </Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={PrivateRoute(ProfilePage)}/>
            <Route path="/events" component={EventPage}/>
        </BrowserRouter>
    );
}

export default Router;
