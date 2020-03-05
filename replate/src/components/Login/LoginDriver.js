import React, { useState, useEffect, useContext, Component } from 'react';
import axios from 'axios';
import * as yup from "yup";
import {BusinessContext} from "../../contexts/BusinessContext";
import {DriverContext} from "../../contexts/DriverContext";

class LoginDriver extends Component {

	state = {
		credentials: { 
			username: '',
			email: '',
			password: ''
		},
		passwordCheck : true
	}

	handleChange = e => {
		if(e.target.name === 'password'){
			if(e.target.value.length <= 5){
				this.setState({
					passwordCheck: true,
					credentials: {
						...this.state.credentials,
					}
				})
			} else {
				this.setState({
					passwordCheck: false,
					credentials: {
						...this.state.credentials,
					}
				})
			}
		}
		this.setState({
			...this.state,
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value
			}
		})
	}

	style = {
		Error: {
			border: '1px solid red',
			color: 'red'
		}
	};

	signIn = e => {
		e.preventDefault();
		console.log(this.state);
		if(!this.state.passwordCheck){
			return;
		}
		axios.post('https://replate-bw.herokuapp.com/api/login/driver', {
			username: this.state.credentials.username,
			password: this.state.credentials.password
		})
		.then(res => {
			console.log(res);
			localStorage.setItem('token', res.data.token);
			this.props.props.push('/Driver');
		})
		.catch(err => console.log(err));
	}

	render(){
		return (
			<div className="login-form">
				<form onSubmit={this.signIn}>
					<label>
						Username:
						<input 
							type="text" 
							name="username"
							value={this.state.credentials.username}
							onChange={this.handleChange} 
							required
						/>
					</label>
					<label>
						Email:
						<input 
							type="email"
							pattern='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$' 
							name="email"
							value={this.state.credentials.email}
							onChange={this.handleChange}	
							required 
							/>
					</label>
					<label>
						Password:
						<input 
							type="password" 
							name="password"
							value={this.state.credentials.password}
							onChange={this.handleChange}
							style={!this.state.passwordCheck ? this.style.Error : null} 
							required
						/>
					</label>
					<input type="submit" value='Submit' />
					<label className="checbox-container">
						<input type="checkbox" name="rememberMe" className="checkbox" />
						Keep me Signed In<br />
					</label>
				</form>
			</div>
		)
	}
};

export default LoginDriver;