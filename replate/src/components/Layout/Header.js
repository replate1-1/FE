import React from "react";
import logo from '../../imgs/ReplateLogoIcon.png';

export default function Header() {
    return (
        <div className='header'>
            <img src={logo} />
            <h1>Welcome to Replate</h1>
        </div>
    )
}