import React, { Component } from 'react';
import axios from 'axios';

class SignUpBusiness extends Component {
    state = {
        credentials : {
            username: '',
            password: '',
            passwordCheck: '',
            email: '',
            businessAddress: '',
            businessName: '',
            phoneNumber: null,
        }
    }

    handleChange = e =>{
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    signUp = e =>{
        e.preventDefault();
        if(this.state.credentials.password != this.state.credentials.passwordCheck){
            alert('password doesnt match')
            return;
        } else {
            axios.post('test', this.credentials)
                .then(res =>{
                    this.props.history.push('/Login');
                })
                .catch(err => console.log(err));
            this.props.history.push('/Login'); //shows that itll take u to login after clicking submit while we wait for backend
        }
    }


    render() {
        return (
            <form onSubmit={this.signUp}>
                <label for='username' > Username: </label>
                <input 
                    type='text'
                    name='username'
                    id='username'
                    value={this.state.credentials.username}
                    onChange={this.handleChange}
                />
                <label for='password' > Password: </label> 
                <input 
                    type='password'
                    name='password'
                    id='password'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                />
                <label for='password' > Re-Enter Password: </label> 
                <input 
                    type='password'
                    name='passwordCheck'
                    id='passwordCheck'
                    value={this.state.credentials.passwordCheck}
                    onChange={this.handleChange}
                />
                <label for='email' > Email: </label>  
                <input 
                    type='email'
                    name='email'
                    id='email'
                    value={this.state.credentials.email}
                    onChange={this.handleChange}
                />
                <label for='businessName' > BusinessName: </label> 
                <input 
                    type='text'
                    name='businessName'
                    id='businessName'
                    value={this.state.credentials.businessName}
                    onChange={this.handleChange}
                />
                <label for='businessAddress' > businessAddress: </label> 
                <input 
                    type='text'
                    name='businessAddress'
                    id='businessAddress'
                    value={this.state.credentials.businessAddress}
                    onChange={this.handleChange}
                />
                <label for='phoneNumber' > Phone Number: </label>  
                <input 
                    type='number'
                    name='phoneNumber'
                    id='phoneNumber'
                    value={this.state.credentials.phoneNumber}
                    onChange={this.handleChange}
                /><br />
                <input type='submit' value='Sign Up' />
            </form>
        );
    }
}

export default SignUpBusiness;