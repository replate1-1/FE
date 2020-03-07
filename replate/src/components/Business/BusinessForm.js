import React, { Component } from 'react';
import '../../css/SignUp.css'

class BusinessForm extends Component {

    componentDidMount(){
        let dateControl = document.querySelector('input[type="date"]');
        let timeControl = document.querySelector('input[type="time"]');
        let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        dateControl.value= today;
        let todayTime = new  Date()
        let time = `${todayTime.getHours}:${todayTime.getMinutes}`
        timeControl.value= time;
    }

    render() {
        return (
            <div className='pickup'>
            <form onSubmit={this.props.submitPickup}>
                <div className='top' >
                    <div>
                        <label> 📅 Date: </label>
                        <input 
                            type="date"
                            name="pickupTime"
                            min={new Date().toJSON().slice(0,10).replace(/-/g,'-')}
                            required
                        />
                    </div>
                    <div>
                        <label> 🕒 Time: </label>
                        <input 
                            type="time"
                            name="pickupTime"
                            title='Please enter a time'
                            step='600'
                            required
                        />
                    </div>
                </div>
                <label> Food: </label>
                <input 
                    type="text"
                    name="food"
                    title='Please enter a food'
                    value={this.props.state.food}
                    onChange={this.props.handleChangePickup}
                    required
                />
                <label> Amount: </label>
                <input 
                    type="text"
                    pattern='^[1-9]\d*$'
                    title='Please enter an amount of food'
                    name="amount"
                    value={this.props.state.amount}
                    onChange={this.props.handleChangePickup}
                    required
                />
                <label> Description: </label>
                <input 
                    type="text"
                    name="description"
                    value={this.props.state.description}
                    onChange={this.props.handleChangePickup}
                    required
                />
                <label> Lat: </label>
                <input 
                    type="text"
                    pattern='[-+]?([0-9]*\.[0-9]+|[0-9]+)'
                    name="lat"
                    value={this.props.state.lat}
                    onChange={this.props.handleChangePickup}
                    required
                />
                <label> Lng: </label>
                <input 
                    type="text"
                    pattern='[-+]?([0-9]*\.[0-9]+|[0-9]+).'
                    name="lng"
                    value={this.props.state.lng}
                    onChange={this.props.handleChangePickup}
                    required
                />
                <input type="submit" value='Submit' />
            </form>
            </div>
        );
    }
}

export default BusinessForm;