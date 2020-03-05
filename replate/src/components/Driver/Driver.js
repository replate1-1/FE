import React, { Component } from 'react';
import { TextInput, Button, Label } from "evergreen-ui";
import Location from '../Location/Location';

class Driver extends Component {
    render() {
        return (
            <div className="container">
                <div className="business-home">
                    <h2>Hello {}</h2>
                    <div className="driverNav">
                        {/* google map api */}
                        <ul>
                            <li><Button className="">Call Contact</Button></li>
                            <li><Button className="">Call Helpline</Button></li>
                            <li><Button className="">Parking Toggle</Button></li>
                            <li><Button className="">Center Map</Button></li>
                        </ul>
                        <div className="row">
                            <h2>Your Schedule</h2>
                            <a>Idle</a>
                        </div>
                        <div className="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <Button>Pickup/Stop</Button>
                        </div>
                        <div className="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <Button>Pickup/Stop</Button>
                        </div>
                        <div className="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <Button>Pickup/Stop</Button>
                        </div>
                        <div className="row">
                            <h3>Add stops below?</h3>
                            <Button>Add</Button>
                        </div>
                        <div className="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <Button>Pickup/Stop</Button>
                        </div>
                        <div className="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <Button>Pickup/Stop</Button>
                        </div>
                        <Location />
                    </div>
                </div>
            </div>
        );
    }
}

export default Driver;