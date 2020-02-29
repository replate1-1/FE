import React, { Component } from 'react';
import axios from 'axios';
import { TextInput, Label } from "evergreen-ui";

// IMPORT CONTEXT
import { BusinessContext } from "../../contexts/BusinessContext";

class SignUpBusiness extends Component {

    state = {
        credentials : {
            username: '',
            password: '',
            passwordCheck: '',
            email: '',
            businessAddress: '',
            businessName: '',
            phoneNumber: '',
        },
        invalid : {
            password: false
        }
    }

    style = {
        Error: {
            borderColor: 'red'
        }
    };

    handleChange = e =>{
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    };

    passwordCheck = () =>{
        this.setState({invalid: {
            ...this.state.invalid,
            password: (this.state.credentials.passwordCheck !== this.state.credentials.password)
        }})
    }

    handlePhoneNumber = e =>{
        const re = /^[0-9\b]+$/;
        if(e.target.value === '' || (re.test(e.target.value) && e.target.value.length < 9)){
            this.setState({
                credentials: {
                    phoneNumber: e.target.value
                }
            });
        }
    }

    signUp = e =>{
        e.preventDefault();
        if(this.state.credentials.password !== this.state.credentials.passwordCheck){
            alert('password doesnt match');
            // return;
        } else {
            axios.post('test', this.credentials)
                .then(res =>{
                    this.props.history.push('/Login');
                })
                .catch(err => console.log(err));
            this.props.history.push('/Login'); //shows that it'll take u to login after clicking submit while we wait for backend
        }
    };

    render() {
        return (
            <form onSubmit={this.signUp}>
                <Label htmlFor='username' > Username: </Label><br />
                <TextInput
                    type='text'
                    name='username'
                    id='username'
                    value={this.state.credentials.username}
                    onChange={this.handleChange}
                    required
                />
                <Label htmlFor='password' > Password: </Label><br />
                <TextInput
                    type='password'
                    name='password'
                    id='password'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    onBlur={this.passwordCheck}
                    style={this.state.invalid.password ? this.style.Error : null}
                    required
                />
                <Label htmlFor='passwordCheck' > Re-Enter Password: </Label><br />
                <TextInput
                    type='password'
                    name='passwordCheck'
                    id='passwordCheck'
                    value={this.state.credentials.passwordCheck}
                    onChange={this.handleChange}
                    onBlur={this.passwordCheck}
                    style={this.state.invalid.password ? this.style.Error : null}
                    required
                />
                <Label htmlFor='email' > Email: </Label><br />
                <TextInput
                    type='email'
                    name='email'
                    id='email'
                    value={this.state.credentials.email}
                    onChange={this.handleChange}
                    required
                />
                <Label htmlFor='businessName' > BusinessName: </Label><br />
                <TextInput
                    type='text'
                    name='businessName'
                    id='businessName'
                    value={this.state.credentials.businessName}
                    onChange={this.handleChange}
                    required
                />
                <Label htmlFor='businessAddress' > businessAddress: </Label><br />
                <TextInput
                    type='text'
                    name='businessAddress'
                    id='businessAddress'
                    value={this.state.credentials.businessAddress}
                    onChange={this.handleChange}
                    required
                />
                <Label htmlFor='phoneNumber' > Phone Number: </Label><br />
                <TextInput
                    type='text'
                    pattern= "/^[0-9\b]+$/"
                    name='phoneNumber'
                    id='phoneNumber'
                    value={this.state.credentials.phoneNumber}
                    onChange={this.handlePhoneNumber}
                    required
                /><br />
                <TextInput type='submit' value='Sign Up' />
            </form>
        );
    }
}

export default SignUpBusiness;