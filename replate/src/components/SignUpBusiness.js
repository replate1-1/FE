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
            password: (this.state.credentials.passwordCheck != this.state.credentials.password)
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
                    required
                />
                <label for='password' > Password: </label> 
                <input 
                    type='password'
                    name='password'
                    id='password'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    onBlur={this.passwordCheck}
                    style={this.state.invalid.password ? this.style.Error : null}
                    required
                />
                <label for='passwordCheck' > Re-Enter Password: </label> 
                <input 
                    type='password'
                    name='passwordCheck'
                    id='passwordCheck'
                    value={this.state.credentials.passwordCheck}
                    onChange={this.handleChange}
                    onBlur={this.passwordCheck}
                    style={this.state.invalid.password ? this.style.Error : null}
                    required
                />
                <label for='email' > Email: </label>  
                <input 
                    type='email'
                    name='email'
                    id='email'
                    value={this.state.credentials.email}
                    onChange={this.handleChange}
                    required
                />
                <label for='businessName' > Business Name: </label> 
                <input 
                    type='text'
                    name='businessName'
                    id='businessName'
                    value={this.state.credentials.businessName}
                    onChange={this.handleChange}
                    required
                />
                <label for='businessAddress' > Business Address: </label> 
                <input 
                    type='text'
                    name='businessAddress'
                    id='businessAddress'
                    value={this.state.credentials.businessAddress}
                    onChange={this.handleChange}
                    required
                />
                <label for='phoneNumber' > Phone Number: </label>  
                <input 
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    value={this.state.credentials.phoneNumber}
                    onChange={this.handlePhoneNumber}
                    required
                /><br />
                <input type='submit' value='Sign Up' />
            </form>
        );
    }
}

export default SignUpBusiness;