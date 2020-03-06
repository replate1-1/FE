import React, { Component } from 'react';
import Location from '../Location/Location';
import {axiosWithAuth} from '../../utilities/axiosWithAuth';
import BusinessForm from './BusinessForm';
import { withRouter } from "react-router-dom";


class Business extends Component{
    
    state = {
        pickup: {
            food: '',
            amount: '',
            description: '',
            pickupTime: '',
            lat: '',
            lng: '',
        },
        showPickup: false,
        user: ''
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        axiosWithAuth().get(`/api/user/business/${params.userID}`)
        .then(res => {
            this.setState({
                ...this.state,
                user: res.data
            })
            console.log(this.state);
        })
        .catch(err => console.log(err));
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

    deleteAccount = e =>{
        const { match: { params } } = this.props;
        axiosWithAuth().delete(`/api/business/${params.userID}`)
        .then(res =>{
            console.log(res);
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    submitPickup = e =>{
        e.preventDefault();
        console.log(this.state);
        let dateControl = document.querySelector('input[type="date"]');
        let timeControl = document.querySelector('input[type="time"]');
        let dateTime = dateControl.value.concat(timeControl.value);
        console.log(dateTime);
        axiosWithAuth()
        .post('/api/pickups', {
            ...this.state.pickup,
            pickupTime: dateTime
        })
        .then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                pickup: {
                    food: '',
                    amount: '',
                    description: '',
                    pickupTime: '',
                    lat: '',
                    lng: '',
                },
                showPickup: false
            })
        })
        .catch(err => console.log(err));
        
        console.log(dateControl.value);
    }

    render(){
        return (
            <div className="container">
                Hi {this.state.user.name}
                <div className="business-home">
                <div>
                    <button id={this.state.showPickup ? 'active' : ''} onClick={this.togglePickup}> {!this.state.showPickup ? <> Create Pickup </> : <> Hide Pickup </>} </button>
                    <button onClick={this.deleteAccount}> Delete Account</button>
                </div>    
                { !this.state.showPickup ? 
                    <> </> : 
                    <BusinessForm 
                    handleChangePickup={this.handleChangePickup} 
                    submitPickup={this.submitPickup.bind(this)} 
                    state={this.state} 
                    setState={this.setState.bind(this)} 
                    />
                    }
                </div>

            </div>
        )
    }
}

export default Business;