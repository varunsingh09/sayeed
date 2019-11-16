import React , { Component } from "react";
import { Link } from "react-router-dom"
// eslint-disable-next-line
class LeftNavigation extends Component {
  render() {
    return (
        <ul className="sidebar navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="pagesDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-fw fa-folder" />
                <span>Pages</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                <h6 className="dropdown-header">Login Screens:</h6>
                <Link className="dropdown-item" to="login.html">
                  Login
                </Link>
                <Link to="login" className="dropdown-item" to="register.html">
                  Register
                </Link>
                <Link to="login" className="dropdown-item" >
                  Forgot Password
                </Link>
                <div className="dropdown-divider" />
                <h6 className="dropdown-header">Other Pages:</h6>
                <a className="dropdown-item" href="404.html">
                  404 Page
                </a>
                <Link to="login" className="dropdown-item">
                  Blank Page
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="charts.html"> 
                <i className="fas fa-fw fa-chart-area" />
                <span><a href="grid">Charts</a></span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="tables.html">
                <i className="fas fa-fw fa-table" />
                <span>Tables</span>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="login">
                <i className="fas fa-fw fa-chart-area" />
                <span>Login</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="addState">
                <i className="fas fa-fw fa-chart-area" />
                <span>Add State</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="addCounty">
                <i className="fas fa-fw fa-chart-area" />
                <span>Add County</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="addZiCode">
                <i className="fas fa-fw fa-chart-area" />
                <span>Add ZipCode</span>
              </Link>
            </li>
          </ul>
          
   );
  }
}

export default LeftNavigation;
