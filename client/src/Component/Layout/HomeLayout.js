import React, { Fragment } from "react";
import Header from "./../Header"
import Routes from "./../Auth/Routes"
import LeftNavigation from "./../LeftNavigation"


const HomeLayout = (props) => {
  return (
    <Fragment>
      <Header />
      <div id="wrapper">
        <LeftNavigation />
        <Routes />
      </div>
    </Fragment>
  )
}

export default HomeLayout
