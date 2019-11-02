// eslint-disable-next-line
import React, { Fragment } from 'react';
import Layout from "./Component/Layout"
// import Routes from "./Component/Auth/Routes"
// import Header from "./Component/Header"
// import LeftNavigation from "./Component/LeftNavigation"
import "./assets/vendor/fontawesome-free/css/all.min.css"
import "./assets/vendor/datatables/dataTables.bootstrap4.css"
import "./assets/css/sb-admin.css"




function App() {
  return (
    <Fragment>
      <div>
        <Layout />
        {/* <Header /> */}
        <div id="wrapper">
          {/* <LeftNavigation />
          <Routes /> */}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
