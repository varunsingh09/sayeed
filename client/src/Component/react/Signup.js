import React, { Component } from "react";
import { Link } from "react-router-dom"
import { STATE_LIST, REGISTRATION_API } from "./../data/api"
import axios from "axios";
class Signup extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userInfo: { password: '', email: '', full_name: '', company_name: '', state: '', zipcode: '', agreement_policy: '' }, errors: "", success: "", stateList: null
        }
    }

    componentDidMount = () => {
        document.body.classList.add('bg-dark')
        this.getStateList();
    }


    getStateList = async () => {

        let response = await axios({
            method: 'get',
            url: STATE_LIST,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        });

        if (response.data.errors === undefined) {

            this.setState({ stateList: response.data, errors: "" })
        } else {

            this.setState({ errors: response.data.errors })
        }

    }


    handleChange = (e) => {
        e.preventDefault();

        let { name, value } = e.target;
        let { userInfo } = this.state

        this.setState({ userInfo: { ...userInfo, [name]: value } });
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let { userInfo } = this.state;
        let response = await axios({
            method: 'post',
            url: REGISTRATION_API,
            data: userInfo,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        });

        if (response.data.errors === undefined) {

            localStorage.setItem("foodapp_token", response.data.token)
            this.setState({ userInfo: response.data, error: "", success: "Registration successfuly done" })
        } else {

            this.setState({ errors: response.data.errors, success: "" })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">Register an Account</div>
                    <font color="red">{this.state.errors}</font>
                    <font color="green">{this.state.success}</font>
                    <div className="card-body">
                    <form onSubmit={(e) => this.handleSubmit(e)} >
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input
                                                type="text"
                                                id="full_name"
                                                name="full_name"
                                                className="form-control"
                                                placeholder="Full Name"
                                                required="required"
                                                autoFocus="autoFocus"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <label htmlFor="full_name">Fulll Name</label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input
                                        type="text"
                                        id="company_name"
                                        name="company_name"
                                        className="form-control"
                                        placeholder="Company Name"
                                        required="required"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <label htmlFor="company_name">Company Name</label>
                                </div>
                            </div>
                            <div className="form-group">
                                    <select className="form-control" id="sel1" required="required" name="state" onChange={(e) => this.handleChange(e)}>
                                        <option>Select State</option>
                                        {this.state.stateList !== null && this.state.stateList.state.map((state, index) =>
                                            <option value={`${state.code}`} key={index}>{state.name}</option>
                                            )
                                        }
                                    </select>
                                   
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input
                                                type="text"
                                                id="zipcode"
                                                name="zipcode" 
                                                className="form-control"
                                                placeholder="Zipcode"
                                                required="required"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <label htmlFor="zipcode">Zipcode</label>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>                       
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email"
                                                required="required"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input
                                                type="password"
                                                name="password"
                                                id="inputPassword"
                                                className="form-control"
                                                placeholder="Password"
                                                required="required"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-label-group">
                                            <input
                                                type="checkbox"
                                                id="agreement_policy"
                                                name="agreement_policy"
                                                className="form-control"
                                                placeholder="Policy"
                                                required="required"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <label htmlFor="agreement_policy"> Agreement Policy</label>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                              
                            <button className="btn btn-primary btn-block">Register</button>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to="login">Login Page</Link>
                            <Link className="d-block small" to="forgotpassword">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
