import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class SignUp extends Component {

    render() {
        return (
            <div>
                <Link to='/SignUp/Business'> Business </Link>
                <br />
                <Link to='/SignUp/Driver'> Driver </Link>
            </div>
        );
    }
}

export default SignUp;