import React, { Component } from 'react';
import Location from '../Location/Location';
import {axiosWithAuth} from '../../utilities/axiosWithAuth';
import BusinessForm from './BusinessForm';
import person from '../../imgs/personico.png';
import phone from '../../imgs/phoneico.png';
import parking from '../../imgs/parkingico.png';
import locationico from '../../imgs/locationico.png';


class Business extends Component{
    
    state = {
        pickup: {
            food: '',
            amount: '',
            description: '',
            time: '',
            date: '',
            lat: '',
            lng: '',
        },
        showPickup: false,
        user: '',
        allPickups: [],
        editPickup: '',
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        axiosWithAuth().get(`/api/user/business/${params.userID}`)
        .then(res => {
            this.setState({
                ...this.state,
                user: res.data
            })
            axiosWithAuth().get(`/api/pickups/${params.userID}`)
            .then(res => {
                console.log(res);
                this.setState({
                    ...this.state,
                    allPickups: res.data
                })
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        console.log(this.state)
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
        axiosWithAuth()
        .delete(`/api/user/business/${this.state.user.username}`)
        .then(res =>{
            console.log(res);
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    militaryToStandard = value =>{
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

    submitPickup = e =>{
        e.preventDefault();
        console.log(this.state);
        let dateControl = document.querySelector('input[type="date"]');
        let timeControl = document.querySelector('input[type="time"]');
        console.log({
            ...this.state.pickup,
            date: dateControl.value,
            time: timeControl.value
        })
        axiosWithAuth()
        .post(`/api/pickups/${this.state.user.username}`, {
            ...this.state.pickup,
            date: dateControl.value,
            time: timeControl.value
        })
        .then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                pickup: {
                    food: '',
                    amount: '',
                    description: '',
                    date: '',
                    time: '',
                    lat: '',
                    lng: '',
                },
                showPickup: false
            })
            this.componentDidMount();
        })
        .catch(err => console.log(err));
    }

    handleEditPickup = e => {
        this.setState({
			...this.state,
            editPickup: {
                ...this.state.editPickup,
                [e.target.name]: e.target.value
            }
		});
    }

    submitEditPickup = e => {
        e.preventDefault();
        let dateControl = document.querySelector('input[type="date"]');
        let timeControl = document.querySelector('input[type="time"]');
        axiosWithAuth().put(`/api/user/business/pickups/${this.state.editPickup.id}`, {
            food: this.state.editPickup.food,
            amount: this.state.editPickup.amount,
            description: this.state.editPickup.description,
            date: dateControl.value,
            time: timeControl.value,
            lat: this.state.editPickup.lat,
            lng: this.state.editPickup.lng,
        })
        .then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                editPickup: {
                    ...this.state.editPickup,
                    show: false,
                }
            })
            this.componentDidMount();
        })
        .catch(err => console.log(err));
    }

    deletePickup = id =>{
        axiosWithAuth().delete(`/api/pickups/${id}`)
        .then(res =>{
            this.componentDidMount();
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <div className="container">
                <h1> Hello {this.state.user.username} </h1>
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
                    state={this.state.pickup} 
                    setState={this.setState.bind(this)} 
                    />
                }
                    <div className='accountContainer'>
                        <div className='businessContain'>
                            <div className='map'> 
                                <Location />
                            </div>
                            <div className='profile'>
                                <img src={person} />
                                <img src={phone} />
                                <img src={parking} />
                                <img src={locationico} />
                            </div>
                        </div>
                        <div className='pickups'>
                        <h1> Your Pickups </h1>
                        </div>
                        <div className='pickups'>
                        {this.state.allPickups.map(obj =>(
                                <div className='pickup'> 
                                    <h1> {this.militaryToStandard(obj.time)} </h1>
                                    <h2> {obj.businessUsername} </h2>
                                    <h2> {obj.food} </h2> 
                                    <span>
                                        <button onClick={() => 
                                        this.setState({...this.state, editPickup: {id: obj.id, amount: obj.amount, date: obj.date, description: obj.description, food: obj.food, lat: obj.lat, lng: obj.lng, time: '', show: !this.state.editPickup.show}})}> 
                                        Edit Pickup 
                                        </button>
                                        <button onClick={() => this.deletePickup(obj.id) }> Delete Pickup </button>
                                    </span>
                                    { this.state.editPickup.id === obj.id && this.state.editPickup.show ? 
                                        <> 
                                            <div className='editPickup'>
                                                <BusinessForm
                                                    key={this.state.editPickup.id} 
                                                    handleChangePickup={this.handleEditPickup} 
                                                    submitPickup={this.submitEditPickup.bind(this)} 
                                                    state={this.state.editPickup} 
                                                    setState={this.setState.bind(this)} 
                                                />
                                                <button onClick={() => this.setState({...this.state, editPickup: {...this.state.editPickup, show: false}})}> Close </button>
                                            </div>
                                        </>
                                        : <> </>
                                    }
                                </div>
                        ))}
                        </div>
                        <div className='bottom'>
                                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Business;