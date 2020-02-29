import { SessionContext } from "../../contexts/SessionContext";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as yup from "yup";
import Header from "../Header.js";
import Footer from '../Footer.js';

const Login = ({ touched, errors, status }) => {

    const { logged, setLogged} = useContext(SessionContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        status && setUser(status);
    }, [status]);

    return (
        <div className="container">
            <h1>I'm enrolled or interested in....</h1>
            <button>Food Pickup</button>
            <button>Driving</button>
            <button>Serving</button>
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
                    <button>Sign In</button>
                    <label className="checbox-container">
                        <Field type="checkbox" name="rememberMe" />
                        Keep me Signed In
                    </label>
                </Form>
            </div>
            <div>
                <h2>Don't have an email?</h2>
                <p>Give us a call at 555-888-8888 and a representative will help you create an account</p>
            </div>
            <Footer />
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