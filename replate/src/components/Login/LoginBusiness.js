import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { TextInput, Button, Label } from "evergreen-ui";
import * as yup from "yup";
import {BusinessContext} from "../../contexts/BusinessContext";
import {DriverContext} from "../../contexts/DriverContext";
import {axiosWithAuth} from "../../utilities/axiosWithAuth";

const LoginBusiness = () => {

	let history = useHistory();

	const [ login, setLogin ] = useState({
		credentials: {
			username: '',
			email: '',
			password: ''
		},
		passwordCheck : false
	});

	const style = {
		Error: {
			border: '1px solid red',
			color: 'red'
		}
	};

	const handleChange = e => {
		setLogin({
			...login,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post("https://replate-bw.herokuapp.com/api/login/business", login)
			.then(response => {
				console.log("response: ", response);
				setLogin(login);
				history.push("/business");
			})
			.catch(error => {
				localStorage.removeItem("token");
				console.log("invalid login: ", error);
			});
	};

	return (
		<div className="login-form">
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						type="text"
						name="username"
						value={login.credentials.username}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Email:
					<input
						type="email"
						pattern='^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
						name="email"
						value={login.credentials.email}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={login.credentials.password}
						onChange={handleChange}
						style={!login.passwordCheck ? style.Error : null}
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
};

export default LoginBusiness;