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
        <div className="container">
            <h1>I'm enrolled or interested in....</h1>
            <Button>Food Pickup</Button>
            <Button>Driving</Button>
            <Button>Serving</Button>
            <div className="login-form">
                <Form>
                    <Label htmlFor="name">
                        Name<br />
                        <TextInput type="text" name="name" />
                        {errors.name && (
                          <p className="formErrors">{errors.name}</p>
                        )}
                    </Label>
                    <Label htmlFor="email">
                        Email<br />
                        <TextInput type="email" name="email" />
                        {errors.email && (
                          <p className="formErrors">{errors.email}</p>
                        )}
                    </Label>
                    <Label htmlFor="password">
                        Password<br />
                        <TextInput type="password" name="password" />
                        {errors.password && (
                          <p className="formErrors">{errors.password}</p>
                        )}
                    </Label><br />
                    <Button>Login</Button>
                </Form>

            </div>
            <div>
                <h2>Don't have an email?</h2>
                <p>Give us a call at 555-888-8888 and a representative will help you create an account</p>
            </div>
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