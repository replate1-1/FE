import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import { TextInput, Button, Label } from "evergreen-ui";
import * as yup from "yup";
import {BusinessContext} from "../../contexts/BusinessContext";
import {DriverContext} from "../../contexts/DriverContext";
import LoginBusiness from "./LoginBusiness";
import LoginDriver from "./LoginDriver";

const Login = (props) => {

    const { business, setBusiness }     = useContext(BusinessContext);
    const { driver, setDriver }         = useContext(DriverContext);

    const handleClickBusiness = () => {
        setBusiness(true);
        setDriver(false);
    };

    const handleClickDriver = () => {
        setDriver(true);
        setBusiness(false);
    };
    
    return (
        <div className="container">
            <h1>I'm enrolled or interested in...</h1>
            <Button onClick={handleClickBusiness}>Food Pickup</Button>
            <Button onClick={handleClickDriver}>Driving</Button>
            <Button onClick={() => {}}>Serving</Button>
            {driver ? (
              <LoginDriver/>
            ) : business ? (
              <LoginBusiness/>
            ) : <> </>}
            <div>
                <h2>Don't have an email?</h2>
                <p>Give us a call at 555-888-8888 and a representative will help you create an account</p>
            </div>
        </div>
    )
};

export default Login;