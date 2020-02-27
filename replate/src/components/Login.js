
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as yup from "yup";

const Login = ({ touched, errors, status }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        status && setUser(status);
    }, [status]);

    return (
        <div className="login-form">
            <Form>
                <label>
                    Name
                    <Field type="text" name="name" />
                    {errors.name && (
                        <p className="formErrors">{errors.name}</p>
                    )}
                </label>
                <label>
                    Email
                    <Field type="email" name="email" />
                    {errors.email && (
                        <p className="formErrors">{errors.email}</p>
                    )}
                </label>
                <label>
                    Name
                    <Field type="password" name="password" />
                    {errors.password && (
                        <p className="formErrors">{errors.password}</p>
                    )}
                </label>
                <button>Login</button>
            </Form>
        </div>
    )
}

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
            .required('A vailed email address is required'),
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