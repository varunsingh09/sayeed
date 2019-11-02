// eslint-disable-next-line

import React, { Component } from "react";
import { Link } from "react-router-dom"

class Breadcrumb extends Component {
    render() {
        return (
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Overview</li>
            </ol>
        );
    }
}

export default Breadcrumb;
