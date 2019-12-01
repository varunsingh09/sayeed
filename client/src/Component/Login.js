import React, { Component } from "react";
// import { connect } from 'react-redux';
// import { createContact } from './../actions/ContactAction';
import { LOGIN_API } from "./../data/api"
import { Link } from "react-router-dom"
import axios from "axios";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressInfo: { remember: '', password: '', email: '' }, errors:""
    }
  }

  componentDidMount = () => {
    document.body.classList.add('bg-dark')
  }


  handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    let { addressInfo } = this.state

    this.setState({ addressInfo: { ...addressInfo, [name]: value } });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let { addressInfo } = this.state;

    let response = await axios({
      method: 'post',
      url: LOGIN_API,
      data: addressInfo,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    });

    if (response.data.errors === undefined) {

      localStorage.setItem("foodapp_token", response.data.token)
      // console.log(this.props.history.push('/'))
      this.props.history.push('/')
      this.setState({ userInfo: response.data, errors: "" })


    } else {

      this.setState({ errors: response.data.errors })
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <font color="red">{this.state.errors}</font>    
          <div className="card-body">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="form-group">
                <div className="form-label-group">
                  <input onChange={(e) => this.handleChange(e)}
                    name="email"
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    required="required"
                    autoFocus="autoFocus"
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input onChange={(e) => this.handleChange(e)}
                    name="password"
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required="required"
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
              </div>
              <div className="form-group">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" name="remember" defaultValue="remember-me" onChange={(e) => this.handleChange(e)} />
                    Remember Password
                  </label>
                </div>
              </div>
              <button className="btn btn-primary btn-block" >Login</button>
            </form>
            <div className="text-center">
              <Link className="d-block small mt-3" to="signup">
                Register an Account
              </Link>
              <a className="d-block small" href="forgot-password.html">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
