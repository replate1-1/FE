import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import { TextInput, Button, Label } from "evergreen-ui";
import * as yup from "yup";

const Login = ({ touched, errors, status }) => {

    const [user, setUser] = useState({});
    // const [driver, setDriver] = useState({});
    // const [business, setBusiness] = useState({});

    const style = {
        Error: {
            border: '1px solid red',
            color: 'red'
        }
    }

    useEffect(() => {
        status && setUser(status);
    }, [status]);

    // useEffect(() => {
    //     if({driver}) {
    //         status && setDriver(status);
    //     } else if({business}) {
    //         status && setBusiness(status);
    //     } else {
    //         return null;
    //     }
    // }, [status]);

    return (
        <div className="container">
            <h1>I'm enrolled or interested in....</h1>
            <Button >Food Pickup</Button>
            <Button>Driving</Button>
            <Button>Serving</Button>
            <div className="login-form">
                <Form>
                    <Label>
                        Name<br />
                        <TextInput type="text" name="name" style={errors.name ? style.Error : null} />
                        {/* {errors.name && (
                            <p style={errors.name ? style.Error : null}>{errors.name}</p>
                        )} */}
                    </Label>
                    <Label>
                        Email<br />
                        <TextInput type="email" name="email" style={errors.email ? style.Error : null} />
                        {/* {errors.email && (
                            <p style={errors.email ? style.Error : null}>{errors.email}</p>
                        )} */}
                    </Label>
                    <Label>
                        Name<br />
                        <TextInput type="password" name="password" style={errors.email ? style.Error : null} />
                        {/* {errors.password && (
                            <p style={errors.password ? style.Error : null}>{errors.password}</p>
                        )} */}
                    </Label><br />
                    <Button>Sign In</Button>
                    <Label className="checbox-container">
                        <Field type="checkbox" name="rememberMe" />
                        Keep me Signed In<br />
                    </Label>
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
    // handleSubmit: (values, { resetForm, setDriver, setBusiness }) => {
    //     console.log('values', values);
    //     if({driver}) {
    //         axios
    //             .post('https://replate-bw.herokuapp.com/api/user/driver')
    //             .then(response => {
    //                 console.log('response', response);
    //                 setDriver(response.data, values);
    //                 resetForm();
    //             })
    //             .catch(error => console.log('error', error));
    //     } else if({business}) {
    //         axios
    //             .post('https://replate-bw.herokuapp.com/api/user/business')
    //             .then(response => {
    //                 console.log('response', response);
    //                 setBusiness(response.data, values);
    //                 resetForm();
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    // }
    handleSubmit: (values, { resetForm, setStatus }) => {
        console.log('values', values);
        axios
            .post('https://replate-bw.herokuapp.com/')
            .then(response => {
                console.log('response', response);
                setStatus(response.data, values);
                resetForm();
            })
            .catch(error => console.log('error', error));
    }
})(Login);