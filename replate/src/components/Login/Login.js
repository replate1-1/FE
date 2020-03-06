import React, {useContext } from 'react';
import {Button} from "evergreen-ui";
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
            <Button id={business ? 'active' : ''} onClick={handleClickBusiness}>Food Pickup</Button>
            <Button id={driver ? 'active' : ''} onClick={handleClickDriver}>Driving</Button>
            <Button onClick={() => {}}>Serving</Button>
            {driver ? (
              <LoginDriver props={props.history}/>
            ) : business ? (
              <LoginBusiness props={props.history}/>
            ) : <> </>}
            <div>
                <h2>Don't have an email?</h2>
                <p>Give us a call at 555-888-8888 and a representative will help you create an account</p>
            </div>
        </div>
    )
};

export default Login;