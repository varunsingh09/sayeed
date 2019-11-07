import React, { Component } from "react";
import { Link } from "react-router-dom"

class Forgotpassword extends Component {
    componentDidMount = () => {
        document.body.classList.add('bg-dark')
    }
    render() {
        return (
            
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Reset Password</div>
                    <div className="card-body">
                        <div className="text-center mb-4">
                            <h4>Forgot your password?</h4>
                            <p>
                                Enter your email address and we will send you instructions on
                                how to reset your password.
                            </p>
                        </div>
                        <form>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Enter email address"
                                        required="required"
                                        autoFocus="autoFocus"
                                    />
                                    <label htmlFor="inputEmail">Enter email address</label>
                                </div>
                            </div>
                            <Link className="btn btn-primary btn-block" to="login">Reset Password</Link>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to="signup">Register an Account</Link>
                            <Link className="d-block small" to="login">Login Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forgotpassword;
