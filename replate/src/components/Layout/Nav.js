import React, { Component, useState } from 'react';
import { useHistory } from "react-router-dom";

const Nav = () => {
    const history = useHistory();
    const [nav, setNav] = useState(false);

    return (
        <div>
            <div className={!nav ? 'container-buttons' : 'change'} onClick={() => setNav(!nav)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            {!nav ? <> </> : 
            <div className='links'>
                <a onClick={() => history.push('/')}> Home </a>
                <a onClick={() => history.push('/Login')}> Login </a>
                <a onClick={() => history.push('/SignUp')}> SignUp </a>
            </div>
            }
        </div>
    );
}

export default Nav;