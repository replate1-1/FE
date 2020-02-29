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
            border: '1px solid red'
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

    passwordCheck = () =>{
        this.setState({invalid: {
            ...this.state.invalid, 
            password: (this.state.credentials.passwordCheck !== this.state.credentials.password)
        }})
    }

    handlePhoneNumber = e =>{
        const re = /^[0-9\b]+$/;
        if(e.target.value === '' || (re.test(e.target.value) && e.target.value.length <= 10)){
            this.setState({
                credentials: {
                    ...this.state.credentials,
                    phoneNumber: e.target.value
                }
            });
        }
    }

    signUp = e =>{
        e.preventDefault();
        console.log({
            username: this.state.credentials.username,
            email:  this.state.credentials.email,
            password: this.state.credentials.password,
            businessName: this.state.credentials.businessName,
            businessAddress: this.state.credentials.businessAddress,
            phoneNumber: this.state.credentials.phoneNumber
        })
        if(this.state.credentials.password !== this.state.credentials.passwordCheck){
            alert('password doesnt match');
            return;
        } else {
            axios.post('https://replate-bw.herokuapp.com/api/user/business',
            {
                username: this.state.credentials.username,
                email:  this.state.credentials.email,
                password: this.state.credentials.password,
                businessName: this.state.credentials.businessName,
                businessAddress: this.state.credentials.businessAddress,
                phoneNumber: this.state.credentials.phoneNumber
            }
            )
                .then(res =>{
                    console.log(res);
                    this.props.history.push('/Login');
                })
                .catch(err => console.log(err));
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