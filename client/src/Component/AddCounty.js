import React, { Component } from "react";
import { STATE_LIST , ADD_STATE } from "./../data/api"
import axios from "axios";
class AddCounty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            addCounty: { label: '', name: '', zipcode: '', parent_id:'' }, errors: "", success: "",stateList: null
        }
    }

    componentDidMount = () => {
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
        let { addCounty } = this.state

        this.setState({ addCounty: { ...addCounty, [name]: value } });
    }

    handleSubmit = async (e) => {

        e.preventDefault();
        let { addCounty } = this.state;

        let response = await axios({
            method: 'post',
            url: ADD_STATE,
            data: addCounty,
            config: {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        });

        if (response.data.errors === undefined) {

            this.setState({ error: "", success: "County successfuly added." })
        } else {

            this.setState({ errors: response.data.errors, success: "" })
        }
    }



    render() {

        return (
            <div className="container">
                <div className="card card-register mx-auto mt-5">
                    <div className="card-header">Add County</div>
                    <font color="red">{this.state.errors}</font>
                    <font color="green">{this.state.success}</font>
                    <div className="card-body">
                    <form onSubmit={(e) => this.handleSubmit(e)} >
                        <div className="form-group">
                            <select className="form-control"
                                required="required" name="parent_id" 
                                onChange={(e) => this.handleChange(e)}>
                                <option>Select State</option>
                                {this.state.stateList !== null && this.state.stateList.state.map((state, index) =>
                                    <option value={`${state.label}`} key={index}>{state.name}</option>
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
                                    <label htmlFor="name">County Name</label>
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

export default AddCounty;
