import React from "react";
import { withRouter } from "react-router";
import { Switch } from "react-router-dom"
import HomeLayout from "./HomeLayout"
import LoginLayout from "./LoginLayout"


const index = (props) => {
  let { pathname } = props.location
  let header = <HomeLayout />

  if (pathname.includes("login") === true || pathname.includes("signup") === true || pathname.includes("forgotpassword") === true) {
    header = <LoginLayout {...props} />
  } 
  return (
    <Switch>
      {header}
    </Switch>
  )
}

export default withRouter(index);
