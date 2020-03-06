import React, { useState, useEffect } from 'react';
import { TextInput, Button, Label } from "evergreen-ui";
import Location from '../Location/Location';
import {axiosWithAuth} from "../../utilities/axiosWithAuth";
import {useParams} from "react-router";

const Driver = () => {

    const {id} = useParams();
    console.log("?: ", id);

    const [pickUp, setPickUp] = useState([]);
    const [location, setLocation] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        axiosWithAuth()
          .get('/api/pickups')
          .then(response => {
              console.log("Response: ", response.data)
              setPickUp(response.data)
          })
          .catch(error => {
              console.log("What's the hold up? ", error)
          });
        axiosWithAuth()
          .get(`/api/businesses`)
          .then(response => {
              console.log("Business: ", response)
          })
          .catch(error => {
              console.log("What's the matter? ", error)
          })
    }, []);

    const addPickUp = location => {
        setSchedule([...schedule, location])
    };

    return (
        <div className="container">
            <div className="business-home">
                <h2>Hello {}</h2>
                <section className="section-container">
                    <div className="content content-map">
                        <div className="map-content">
                            <Location />
                        </div>
                        <div className="map-actions">
                            <ul>
                                <li><Button className="">Call Contact</Button></li>
                                <li><Button className="">Call Helpline</Button></li>
                                <li><Button className="">Parking Toggle</Button></li>
                                <li><Button className="">Center Map</Button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="content content-schedule">
                        <div className="content-header header-schedule">
                            <h2>Your Schedule</h2>
                        </div>
                        <div className="content-body body-schedule">
                            <ul>
                                {schedule.map(location => {
                                    console.log("Location: ", location)
                                    return (
                                      <li key={location.id}>
                                          <div>{location.pickupTime}</div>
                                          <div>
                                              <div>{location.food}</div>
                                              <div>address</div>
                                          </div>
                                          <div>
                                            <span>{location.index}</span>
                                          </div>
                                      </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="content content-pickups">
                        <div className="content-header header-pickups">
                            <h2>Add stops below?</h2>
                            <span><Button>Add</Button></span>
                        </div>
                        <div className="content-body body-pickups">
                            <ul>
                            {pickUp.map(location => {
                                console.log("Location: ", location)
                                return (
                                  <li key={location.id}>
                                      <div>{location.pickupTime}</div>
                                      <div>
                                          <div>{location.food}</div>
                                          <div>address</div>
                                      </div>
                                      <div>
                                          <Button
                                            onClick={() => {
                                                addPickUp(location)
                                            }}
                                          >
                                              Pickup / Stop
                                          </Button>
                                      </div>
                                  </li>
                                )
                            })}
                            </ul>
                        </div>
                    </div>
                </section>
                <div className="driverNav">
                    {/* google map api */}

                     <div className="row">

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

                </div>
            </div>
        </div>
    );
}

export default Driver;