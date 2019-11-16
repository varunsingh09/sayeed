import React, { Component } from "react";
import { ADD_STATE } from "./../data/api"
import axios from "axios";
class AddState extends Component {


    constructor(props) {
        super(props);
        this.state = {
            addState: { label: '', name: '', zipcode: '', parent_id: 0 }, errors: "", success: ""
        }
    }




    handleChange = (e) => {
        e.preventDefault();

        let { name, value } = e.target;
        let { addState } = this.state

        this.setState({ addState: { ...addState, [name]: value } });
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let { addState } = this.state;
        let response = await axios({
            method: 'post',
            url: ADD_STATE,
            data: addState,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        });

        if (response.data.errors === undefined) {

            this.setState({ error: "", success: "State successfuly added." })
        } else {

            this.setState({ errors: response.data.errors, success: "" })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">Add State</div>
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
                                                id="label"
                                                name="label"
                                                className="form-control"
                                                placeholder="Label"
                                                required="required"
                                                autoFocus="autoFocus"
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                            <label htmlFor="label">Label</label>

                                        </div>

                                    </div>
                                    <label htmlFor="label">Always in CAPS (like UP,MP,HP)</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="State Name"
                                        required="required"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <label htmlFor="name">State Name</label>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-block">Save</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddState;
