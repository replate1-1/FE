import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import { TextInput, Button, Label } from "evergreen-ui";
import * as yup from "yup";

const Login = ({ touched, errors, status }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        status && setUser(status);
    }, [status]);

    return (
        <div className="login-form">
            <Form>
                <Label htmlFor="name">
                    Name
                    <TextInput type="text" name="name" />
                    {errors.name && (
                        <p className="formErrors">{errors.name}</p>
                    )}
                </Label>
                <Label htmlFor="email">
                    Email
                    <TextInput type="email" name="email" />
                    {errors.email && (
                        <p className="formErrors">{errors.email}</p>
                    )}
                </Label>
                <Label htmlFor="password">
                    Password
                    <TextInput type="password" name="password" />
                    {errors.password && (
                        <p className="formErrors">{errors.password}</p>
                    )}
                </Label>
                <Button>Login</Button>
            </Form>
        </div>
    )
};

export default withFormik({
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
    handleSubmit: (values, { resetForm, setStatus }) => {
        console.log('values', values);
        axios
            .post('')
            .then(response => {
                console.log('response', response);
                setStatus(response.data, values);
                resetForm();
            })
            .catch(error => console.log('error', error));
    }
})(Login);