import React from 'react';
import { Link } from "react-router-dom"

function Menu() {
    return (

        <ul className="list-group">
            <li className="list-group-item"><Link to="addUser">Add User</Link></li>
            <li className="list-group-item"><Link to="userList">User List</Link></li>
        </ul>

    );
}

export default Menu;
