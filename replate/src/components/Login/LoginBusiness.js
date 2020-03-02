import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import { TextInput, Button, Label } from "evergreen-ui";
import * as yup from "yup";
import {BusinessContext} from "../../contexts/BusinessContext";
import {DriverContext} from "../../contexts/DriverContext";

const LoginBusiness = ({ touched, errors, status }) => {

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
					<Field type="text" name="name" style={errors.name ? style.Error : null} />
					{/* {errors.name && (
						<p style={errors.name ? style.Error : null}>{errors.name}</p>
					)} */}
				</Label>
				<Label>
					Email:<br />
					<Field type="email" name="email" style={errors.email ? style.Error : null} />
					{/* {errors.email && (
						<p style={errors.email ? style.Error : null}>{errors.email}</p>
					)} */}
				</Label>
				<Label>
					Password:<br />
					<Field type="password" name="password" style={errors.email ? style.Error : null} />
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

const FormikLoginBusiness = withFormik({
	mapPropsToValues: props => ({
		name: "",
		email: "",
		password: ""
	}),
	validationSchema: yup.object().shape({
		name: yup
			.string()
			.required('A name is required'),
		email: yup
			.string()
			.required('A valid email address is required'),
		password: yup
			.string()
			.min(6, 'Your password must be at least 6 characters')
			.required('A password is required')
	}),
	handleSubmit: (values, formikBag) => {

		console.log("formikBag: ", formikBag);
		console.log('values', values);
		// console.log('User: Business: ', setBusiness);
		// console.log('User: Driver: ', driver);
		axios
			.post('https://replate-bw.herokuapp.com/api/user/business')
			.then(response => {
				console.log('response', response);
				// setBusiness(response.data, values);
				formikBag.resetForm();
			})
			.catch(error => console.log('error', error));
	}
})(LoginBusiness);

export default FormikLoginBusiness;