import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import SignUpBusiness from '../SignUp/SignUpBusiness';
import SignUpDriver from '../SignUp/SignUpDriver';

class SignUp extends Component {

    state = {
        Business: false,
        Driver: false
    }

    render() {
        return (
            <div className='signup'>
                <button onClick={() => this.setState({Driver: false, Business: !this.state.Business})}> Business </button>
                <button onClick={() => this.setState({Driver: !this.state.Driver, Business: false})}> Driver </button>
                {this.state.Business ? <SignUpBusiness props={this.props.history} /> : null}
                {this.state.Driver ? <SignUpDriver props={this.props.history} /> : null}
            </div>
        );
    }
}

export default SignUp;