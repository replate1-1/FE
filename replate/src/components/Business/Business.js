import React from 'react';
import { TextInput, Button, Label } from "evergreen-ui";

export default function Business() {
    return (
        <div className="container">
            <div className="business-home">
                <h2>Hello {}</h2>
                <div className="driverNav">
                    {/* google map api */}
                    <ul>
                        <li><Button className="">Call Contact</Button></li>
                        <li><Button className="">Call Helpline</Button></li>
                        <li><Button className="">ETA</Button></li>
                        <li><Button className="">Center Map</Button></li>
                    </ul>
                    <div className="business-current-pickup">
                        <div className="pickup-info">
                            <h3>Today 8:00 pm</h3>
                            <p>Less...</p>
                            <p>Pickup acquired. Driver is in transit. ETA approx. 12 minutes</p>
                        </div>
                        <div className="business-actions">
                            <Button>Edit</Button>
                            <Button>Cancel</Button>
                        </div>
                    </div>
                    <div className="business-future-pickup">
                        <div className="business-future-pickup-info">
                            <h3>Date Time</h3>
                        </div>
                        <div className="business-future-actions">
                            <Button>Edit</Button>
                            <Button>Cancel</Button>
                        </div>
                    </div>
                    <div className="row">
                        <h3>Schedule New</h3>
                        <Button>Click Here</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}