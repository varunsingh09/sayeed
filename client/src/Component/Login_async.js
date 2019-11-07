import React, { Component } from "react";
import { connect } from 'react-redux';
import { createContact } from './../actions/ContactAction';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressInfo: { remember: '', password: '', email: '' }
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

  handleSubmit = (e) => {
    e.preventDefault();
    let { addressInfo } = this.state;
    this.props.createContact(addressInfo);


  }
  render() {
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
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
              <a className="d-block small mt-3" href="register.html">
                Register an Account
              </a>
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

const mapStateToProps = (state, ownProps) => {
  console.log("======================",state)
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(createContact(contact))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
