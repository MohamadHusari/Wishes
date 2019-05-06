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
// import ErrorPage from './ErrorPage';
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
            <Route path="/profile" component={PrivateRoute(ProfilePage)}/>
            <Route path="/events" component={EventPage}/>
            {/*<Route path="/err" component={ErrorPage}/>*/}
        </BrowserRouter>
    );
}

export default Router;
