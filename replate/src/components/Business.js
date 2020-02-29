import React from 'react';
import Header from 'header';
import Footer from 'footer';

export default function Business() {
    return (
        <div className="container">
            <Header />
            <div className="business-home">
                <h2>Hello {}</h2>
                <div className="driverNav">
                    {/* google map api */}
                    <ul>
                        <li><button className="">Call Contact</button></li>
                        <li><button className="">Call Helpline</button></li>
                        <li><button className="">ETA</button></li>
                        <li><button className="">Center Map</button></li>
                    </ul>
                    <div className="business-current-pickup">
                        <div className="pickup-info">
                            <h3>Today 8:00 pm</h3>
                            <p>Less...</p>
                            <p>Pickup acquired. Driver is in transit. ETA approx. 12 minutes</p>
                        </div>
                        <div className="business-actions">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div className="business-future-pickup">
                        <div className="business-future-pickup-info">
                            <h3>Date Time</h3>
                        </div>
                        <div className="business-future-actions">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                    <div class="row">
                        <h3>Schedule New</h3>
                        <button>Click Here</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}