import React, { Fragment } from 'react';
import Menu from "./Component/Menu"
import AddUser from "./Component/AddUser"

function App() {
  return (
    <Fragment>
      <div className="container">
        <h3>Home Page</h3>
        <div className="row">
          <div className="col-sm-3" style={{ "backgroundColor": "yellow" }}>
            <Menu />
          </div>
          <div className="col-sm-9" style={{ "backgroundColor": "pink" }}>
            <AddUser />

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
