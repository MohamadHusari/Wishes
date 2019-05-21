import React from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
// import Landing from './Landing';
import AccountPage from './AccountPage';
import Navbar from './Navbar'
import Header from './Header';
import ProfilePage from './ProfilePage';
import PrivateRoute from './PrivateRoute';
import EventPage from './EventPage';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import CheckErrorPage from './CheckErrorPage';
import SpecificEvent from './SpecificEvent';
import CreateEvents from './CreateEvents';
import MyEventsPage from './MyEventsPage';
import useGlobal from './store';



const Router = ()=> {
    const [globalState, globalActions] = useGlobal();
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Header} />
                <Route path="/" render={props => (<Navbar {...props} ChangeNavWord={globalState.ChangeNavWord}/>)} />
            </Switch>
            {/*<Route path="/login" component={LoginPage} />*/}
            <Switch>
            <Route
                path='/account'
                render={props => (
                    // pass the sub-routes down to keep nesting
                    <AccountPage {...props} routes={[
                        {
                            path: "/account/signup",
                            component: SignUpForm,
                            GlobalActions:globalActions
                        },
                        {
                            path: "/account/signin",
                            component: SignInForm,
                            GlobalActions:globalActions
                        }
                    ]} />
                )}
            />
            <Route exact path="/profile" component={PrivateRoute(ProfilePage)}/>
            <Route exact path="/myEvents" component={PrivateRoute(MyEventsPage)}/>
            <Route exact path="/events" component={EventPage}/>
            <Route path="/event/add" component={PrivateRoute(CreateEvents)}/>
            <Route path="/event/:eventid" component={SpecificEvent} />
            <Route component={CheckErrorPage}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
