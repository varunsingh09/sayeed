import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import axios from "axios";

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: { password: '', email: '', full_name: '', company_name: '', state: '', zipcode: '', agreement_policy: '' }, errors: "", success: "", stateList: null
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
    const REGISTRATION_API = `http://localhost:8800/api/admins/registration`

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
      this.setState({ userInfo: response.data,error:"", success: "Registration successfuly done" })
    } else {

      this.setState({ errors: response.data.errors,success:"" })
    }
  }


  componentDidMount = () => {
    this.getStateList();
  }

  getStateList = async () => {


    const STATE_LIST_API = `http://localhost:8800/api/admins/stateList`

    let response = await axios({
      method: 'get',
      url: STATE_LIST_API,
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

  render() {

    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
            Registration
          </Typography>
          <Typography color="textSecondary" align="center">
            <font color="red">{this.state.errors}</font>
          </Typography>
          <Typography color="textSecondary" align="center">
            <font color="green">{this.state.success}</font>
          </Typography>


          <form onSubmit={(e) => this.handleSubmit(e)} >
            <TextField required margin="dense" name="full_name" placeholder="Full Name" type="text" fullWidth onChange={(e) => this.handleChange(e)} />
            <TextField required margin="dense" name="company_name" placeholder="Company Name" type="text" fullWidth onChange={(e) => this.handleChange(e)} />

            <Select labelId="demo-simple-select-label" id="demo-simple-select"
              label="Select State" required
              fullWidth onChange={(e) => this.handleChange(e)} name="state">
              <MenuItem>State</MenuItem>
              {this.state.stateList !== null && this.state.stateList.state.map((state, index) =>
                <MenuItem value={`${state.code}`} key={index}>{state.name}</MenuItem>
              )
              }
            </Select>

            <TextField required margin="dense" name="zipcode" placeholder="Zipcode" type="text" fullWidth onChange={(e) => this.handleChange(e)} />
            <TextField required margin="dense" name="email" label="Email Address" type="email" fullWidth onChange={(e) => this.handleChange(e)} />
            <TextField required margin="dense" name="password" label="Password" type="password" fullWidth onChange={(e) => this.handleChange(e)} />
            Agreement Policy
            <Checkbox onChange={(e) => this.handleChange(e)} name="agreement_policy"
              inputProps={{ 'aria-label': 'primary checkbox', }} />

            <Button variant="contained" type="submit" color="primary" className={classes.addUser}>Registration</Button>

          </form>


        </div>
      </Paper>
    );
  }

}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
