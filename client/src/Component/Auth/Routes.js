import React from "react";
import { Switch, Route } from "react-router-dom"
import Home from "./../Home"
import Grid from "./../Grid"
import Login from "./../Login"
import Signup from "./../Signup"
import Forgotpassword from "./../Forgotpassword"

const RoutesArr = [

    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/home",
        exact: true,
        component: Home,
    },
    {
        path: "/grid",
        exact: true,
        component: Grid,
    },
    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/signup",
        exact: true,
        component: Signup,
    },
    {
        path: "/forgotpassword",
        exact: true,
        component: Forgotpassword,
    },

]

const Routes = (props) => {

    return (

        <Switch>

            {RoutesArr.map(({ path, exact, component: Component, ...rest }) => (
                <Route key={path} path={path} exact={exact} render={(props) => (
                    <Component {...props} {...rest} />
                )} />
            ))}
            {/* <Route render={(props) => <NoMatch {...props} />} /> */}
        </Switch>
    );

}

export default Routes
