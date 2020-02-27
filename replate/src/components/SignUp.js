import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class SignUp extends Component {

    render() {
        return (
            <div>
                <Link to='/SignUpBusiness'> Business </Link>
                <br />
                <Link to='/SignUpDriver'> Driver </Link>
            </div>
        );
    }
}

export default SignUp;