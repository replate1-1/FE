import React, { Component } from 'react';
import {BrowserRouter as Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component = Component, ...rest}) =>{
    return (
        <Route 
            {...rest}
            render={props =>(
                localStorage.getItem('token') ? <Component {...props} />
                :
                <Redirect to='/' />
            )}
        />
    )
};

export default PrivateRoute