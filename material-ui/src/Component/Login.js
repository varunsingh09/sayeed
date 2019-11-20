import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';



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

class Login extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {  password: '', email: '',full_name:'',company_name:'',state:'',zipcode:'',agreement_policy:'' }, errors:""}
  }


  handleChange = (e) => {
    e.preventDefault();

    let { name, value } = e.target;
    let { loginInfo } = this.state

    this.setState({ loginInfo: { ...loginInfo, [name]: value } });
  }



  handleSubmit = async (e) => {

    e.preventDefault();
    const LOGIN_API=`http://localhost:8800/api/admins/login`

    let { loginInfo } = this.state;

    let response = await axios({
      method: 'post',
      url: LOGIN_API,
      data: loginInfo,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    });

    if(response.data.errors===undefined){

      localStorage.setItem("foodapp_token",response.data.token)
     // console.log(this.props.history.push('/'))
      this.props.history.push('/')
      this.setState({userInfo:response.data,errors:""})
   
      
    }else{

      this.setState({errors:response.data.errors})
    }   
  }

  componentDidMount=()=>{
      this.getStateList();
  }
  
  getStateList = async ()=>{
    
    const LOGIN_API=`http://localhost:8800/api/admins/stateList`

    let response = await axios({
      method: 'get',
      url: LOGIN_API,
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
    });

    if(response.data.errors===undefined){

      this.setState({stateList:response.data,errors:""})    
    }else{

      this.setState({errors:response.data.errors})
    }   

  }

  render(){
   
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
            Login Form
          </Typography>

          <Typography color="textSecondary" align="center">
            <font color="red">{this.state.errors}</font>       
          </Typography>
          
          <form onSubmit={(e) => this.handleSubmit(e)}>

            <TextField required margin="dense" name="email" label="Email Address" type="email" fullWidth  onChange={(e)=>this.handleChange(e)}/>
            <TextField required margin="dense" name="password" label="Password" type="password" fullWidth onChange={(e)=>this.handleChange(e)}/>
            <Button variant="contained" type="submit" color="primary" className={classes.addUser}>Login</Button>
            
            
            <Button variant="contained" color="primary" className={classes.addUser} href="/register">
              Add user
            </Button>
           
          </form>
         
          
        </div>
      </Paper>
    );
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
