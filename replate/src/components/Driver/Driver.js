import React, { useState, useEffect } from 'react';
import { Button } from "evergreen-ui";
import Location from '../Location/LocationDriver.js';
import { axiosWithAuth } from "../../utilities/axiosWithAuth";
import { useParams } from "react-router";
import person from '../../imgs/personico.png';
import phone from '../../imgs/phoneico.png';
import parking from '../../imgs/parkingico.png';
import locationico from '../../imgs/locationico.png';

const Driver = props => {

    // const {id} = useParams();
    // console.log("?: ", id);

    const [pickUp, setPickUp] = useState([]);
    const [myPickUps, setMyPickups] = useState([]);
    const [location, setLocation] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [points, setPoints] = useState([{ lat: 42.897252, lng: -77.274405 }]);
    const [time, setTime] = useState(Date.now());
    const [key, setKey] = useState(0);
    const [user, setUser] = useState([]);

    useEffect(() => {
    const interval = setInterval(() =>{ 
            if(points.length > 1){
                let pointsnew = points;
                pointsnew.shift();
                console.log(points);
                setPoints(pointsnew);
                setKey(key + 1);
                setTime(Date.now())  
            } else {
                setTime(Date.now())
            }
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [points]);

    useEffect(() => {
        const { match: { params } } = props;
        console.log("Params: ", params);

        axiosWithAuth().get(`/api/user/driver/${params.userID}`)
          .then(response => {
            console.log("User: ", response);
            axiosWithAuth().get(`/api/pickups/driver/${response.data.id}`)
            .then(res => {
                  console.log('my pickups', res.data);
                  setMyPickups(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            setUser(response.data)
          })
          .catch(error => {
              console.log("What's the hold up? ", error)
          });
        axiosWithAuth().get('/api/pickups')
          .then(response => {
              console.log("Pick Ups: ", response.data)
              setPickUp(response.data)
          })
          .catch(error => {
              console.log("What's the hold up? ", error)
          });
        axiosWithAuth().get(`/api/businesses`)
          .then(response => {
              console.log("Business: ", response)
          })
          .catch(error => {
              console.log("What's the matter? ", error)
          })
    }, []);

    const addPickUp = location => {
        const { match: { params } } = props;
        console.log(`addPickup:`, {pickupId: location.id })
        axiosWithAuth().post(`/api/pickups/driver/${user.id}`,{
            pickupId: location.id
        })
        .then(res =>{
            console.log(res);
        })
        .catch(err => console.log(err));
        setSchedule([...schedule, location])
    };

    const removePickup = pickup =>{
        axiosWithAuth().delete(`/api/pickups/${pickUp.id}`)
        .then(res =>{
            axiosWithAuth().post(`/api/pickups/${pickUp.businessUsername}`)
            .then(res =>{
                console.log(res);
            })
        })
        .catch(err => console.log(err));
    }

    const militaryToStandard = value =>{
        let hour = value.substring ( 0,2 ); 
        let minutes = value.substring ( 3,5 );
        let identifier = 'AM';
    
        if(hour == 12){ 
            identifier = 'PM';
        }
        if(hour == 0){
            hour = 12;
        }
        if(hour > 12){ 
            hour = hour - 12;
            identifier='PM';
        }
        return hour + ':' + minutes + ' ' + identifier;
    }

    return (
        <div className="container">
            <div className="driver-home">
                <h1>Hello  {user.username}!</h1>
                <section className="section-container">
                    <div className="content content-map">
                        <div className='businessContain'>
                            <div className='map'> 
                                <Location key={key} points={points} setPoints={setPoints.bind(this)} />
                            </div>
                            <div className='profile'>
                                <img src={person} />
                                <img src={phone} />
                                <img src={parking} />
                                <img src={locationico} />
                            </div>
                        </div>
                        <div className='acceptedPickups'>
                            <h1> Accepted Pickups </h1>
                            <div className='pickups'> 
                            {myPickUps.map(location => (
                                <div className='pickup'> 
                                    <h1> {militaryToStandard(location.time)} </h1>
                                    <h2> {location.businessUsername} </h2>
                                    <h2> {location.food} </h2> 
                                    <span>
                                        <button onClick={() => {removePickup(location)}}> Remove </button> 
                                    </span>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='pickups'>
                            <h1> Potential Pickups </h1>
                        </div>
                        <div className='pickups'> 
                            {pickUp.map(location => (
                                <div className='pickup'> 
                                    <h1> {militaryToStandard(location.time)} </h1>
                                    <h2> {location.businessUsername} </h2>
                                    <h2> {location.food} </h2> 
                                    <span>
                                        <button onClick={() => {addPickUp(location)}}> Pickup </button> 
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bottom'>
                        
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Driver;