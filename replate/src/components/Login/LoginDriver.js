import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import { TextInput, Button, Label } from "evergreen-ui";
import * as yup from "yup";
import {BusinessContext} from "../../contexts/BusinessContext";
import {DriverContext} from "../../contexts/DriverContext";

const LoginDriver = ({ touched, errors, status }) => {

	const { business, setBusiness }     = useContext(BusinessContext);
	const { driver, setDriver }         = useContext(DriverContext);

	const style = {
		Error: {
			border: '1px solid red',
			color: 'red'
		}
	};

	return (
		<div className="login-form">
			<Form>
				<Label>
					Username:<br />
					<Field type="text" name="username" style={errors.username ? style.Error : null} />
					{/* {errors.name && (
						<p style={errors.name ? style.Error : null}>{errors.name}</p>
					)} */}
				</Label>
				{/*<Label>*/}
				{/*	Email:<br />*/}
				{/*	<Field type="email" name="email" style={errors.email ? style.Error : null} />*/}
				{/*	/!* {errors.email && (*/}
				{/*		<p style={errors.email ? style.Error : null}>{errors.email}</p>*/}
				{/*	)} *!/*/}
				{/*</Label>*/}
				<Label>
					Password:<br />
					<Field type="password" name="password" style={errors.password ? style.Error : null} />
					{/* {errors.password && (
						<p style={errors.password ? style.Error : null}>{errors.password}</p>
					)} */}
				</Label><br />
				<Button type="submit">Sign In</Button>
				<Label className="checbox-container">
					<Field type="checkbox" name="rememberMe" />
					Keep me Signed In<br />
				</Label>
			</Form>
		</div>
	)
};

const FormikLoginDriver = withFormik({
	mapPropsToValues: props => ({
		username: "",
		// email: "",
		password: ""
	}),
	validationSchema: yup.object().shape({
		username: yup
			.string()
			.required('A name is required'),
		// email: yup
		// 	.string()
		// 	.required('A valid email address is required'),
		password: yup
			.string()
			.min(6, 'Your password must be at least 6 characters')
			.required('A password is required')
	}),
	handleSubmit: (values, formikBag) => {

		console.log("formikBag: ", formikBag);
		console.log('values', values);

		axios
			.post('https://replate-bw.herokuapp.com/api/login/driver', values)
		  .then(response => {
		  	console.log('response', response);
			  formikBag.props.history.push('/driver');
		    // setDriver(response.data, values);
		    formikBag.resetForm();
			  formikBag.setSubmitting(false);
		    })
		    .catch(error => console.log('error', error));
	}
})(LoginDriver);

export default FormikLoginDriver;