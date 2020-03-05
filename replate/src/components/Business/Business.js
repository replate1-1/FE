import React, { Component } from 'react';
import Location from '../Location/Location';
import { Button } from "evergreen-ui";
import {axiosWithAuth} from '../../utilities/axiosWithAuth';

class Business extends Component{

    state = {
        pickup: {
            food: '',
            amount: '',
            description: '',
            pickupTime: '',
        },
        showPickup: false
    }

    componentDidMount(){

    }

    componentWillUnmount(){
        //localStorage.removeItem('token');
    }

    handleChangePickup = e =>{
        this.setState({
			...this.state,
            pickup: {
                ...this.state.pickup,
                [e.target.name]: e.target.value
            }
		});
    }

    togglePickup = e =>{
        this.setState({
            ...this.state,
            showPickup: !this.state.showPickup
        })
    }

    submitPickup = e =>{
        e.preventDefault();
        let dateControl = document.querySelector('input[type="date"]');
        let timeControl = document.querySelector('input[type="time"]');

        let dateTime = `${dateControl.value}/${timeControl.value}`;

        axiosWithAuth()
        .post('/api/pickups', {
            food: this.state.pickup.food,
            amount: this.state.pickup.amount,
            description: this.state.pickup.description,
            pickupTime: dateTime
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
        
        console.log(dateControl.value);
    }

    render(){
        console.log(this.context);
        return (
            <div className="container">
                <div className="business-home">
                <button onClick={this.togglePickup}> {!this.state.showPickup ? <> Create Pickup </> : <> Hide Pickup </>} </button>
                        { !this.state.showPickup ? <> </> : <form onSubmit={this.submitPickup}>
                            <label> Food: </label>
                            <input 
                                type="text"
                                name="food"
                                value={this.state.pickup.food}
                                onChange={this.handleChangePickup}
                                required
                            />
                            <label> amount: </label>
                            <input 
                                type="text"
                                name="amount"
                                value={this.state.pickup.amount}
                                onChange={this.handleChangePickup}
                                required
                            />
                            <label> description: </label>
                            <input 
                                type="text"
                                name="description"
                                value={this.state.pickup.description}
                                onChange={this.handleChangePickup}
                                required
                            />
                            <label> Date: </label>
                            <input 
                                type="date"
                                name="pickupTime"
                                required
                            />
                            <label> Time: </label>
                            <input 
                                type="time"
                                name="pickupTime"
                                step='600'
                                required
                            />
                            <input type="submit" value='Submit' />
                        </form>
                        }
                </div>
            </div>
        )
    }
}

export default Business;