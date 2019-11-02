import React, { Component, Fragment } from 'react';


class AddUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                name: "",
                mobile: "",
                email: "",
                address: "",
                password: "",
            },
            listUser:[]
        }
    }

    handleOnChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target
        let { userInfo } = this.state
        this.setState({ userInfo: { ...userInfo, [name]: value } })
        //console.log(this.state.userInfo)

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let userInfo  = this.state.userInfo

        this.setState({
            listUser: [...this.state.listUser, userInfo]
          });
    }


    render() {
        console.log(this.state.listUser)
     
        return (

            <Fragment>
                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                    <h4>Add User Information</h4>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" name="name" onChange={(e) => { this.handleOnChange(e) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile:</label>
                        <input type="text" className="form-control" name="mobile" onChange={(e) => { this.handleOnChange(e) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" name="email" onChange={(e) => { this.handleOnChange(e) }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea className="form-control" name="address" onChange={(e) => { this.handleOnChange(e) }}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" name="password" onChange={(e) => { this.handleOnChange(e) }} />
                    </div>

                    <button className="btn btn-info btn-block" type="submit">Submit</button>
                </form>
                {this.state.listUser.length >0 &&
                
                <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.listUser.map((list,index)=>{
                       return <tr key={index}>
                        <td>{list.name}</td>
                        <td>{list.mobile}</td>
                        <td>{list.email}</td>
                        <td>{list.address}</td>
                      </tr>
                    })}
                  
                  
                </tbody>
              </table>
                
                }

            </Fragment>
        )
    }

}
export default AddUser;
