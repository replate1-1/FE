import React, { Component } from 'react';

class Driver extends Component {
    render() {
        return (
            <div className="container">
                <div className="business-home">
                    <h2>Hello {}</h2>
                    <div className="driverNav">
                        {/* google map api */}
                        <ul>
                            <li><button className="">Call Contact</button></li>
                            <li><button className="">Call Helpline</button></li>
                            <li><button className="">Parking Toggle</button></li>
                            <li><button className="">Center Map</button></li>
                        </ul>
                        <div class="row">
                            <h2>Your Schedule</h2>
                            <a>Idle</a>
                        </div>
                        <div class="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <button>Pickup/Stop</button>
                        </div>
                        <div class="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <button>Pickup/Stop</button>
                        </div>
                        <div class="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <button>Pickup/Stop</button>
                        </div>
                        <div class="row">
                            <h3>Add stops below?</h3>
                            <button>Add</button>
                        </div>
                        <div class="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <button>Pickup/Stop</button>
                        </div>
                        <div class="row">
                            <h4>8:00 pm</h4>
                            <p>business<br />business street</p>
                            <button>Pickup/Stop</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Driver;