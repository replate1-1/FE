import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// IMPORT ASSETS
import './css/App.css';
import mainPhotoLeft from './imgs/MainPhotoLeft.png';
import mainPhotoRight from './imgs/MainPhotoRight.png';
import foodKitchen from './imgs/FoodKitchen.png';

// IMPORT UTILITIES
import PrivateRoute from './utilities/PrivateRoute';

// IMPORT CONTEXTS
import { BusinessContext } from "./contexts/BusinessContext";
import { DriverContext } from "./contexts/DriverContext";

// IMPORT APP COMPONENTS
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from './components/Login/Login';
import Driver from './components/Driver/Driver';
import Business from './components/Business/Business';
import SignUp from './components/SignUp/SignUp';
import SignUpDriver from './components/SignUp/SignUpDriver';
import SignUpBusiness from './components/SignUp/SignUpBusiness';

function App() {

  const [business, setBusiness]     = useState(false);
  const [driver, setDriver]         = useState(false);

  return (

    <div>
      <Header />
      <Router>
         <BusinessContext.Provider value={{ business, setBusiness }}>
            <DriverContext.Provider value={{ driver, setDriver }}>
              <div className='App'>
                <Route exact path='/' render={props=> (
                  <div className='main-body'>
                    <div>
                      <img src={mainPhotoLeft} />
                      <img src={mainPhotoRight} />
                    </div>
                    <p> Many businesses have leftover food at the end of the day. </p>
                    <p className='cabin'> We let them effortlessly have those extras picked up by a Replate volunteer and donate to one of our worthy partner organizations. </p>
                    <div className='time'>
                      <h1>Choose a time</h1>
                      <p> and a volunteer will show up and take those extras to a place of need. </p>
                    </div>

                    <h2>Get involved in...</h2>
                    <div className='involved'> 
                      <img src={foodKitchen} />
                      <div className='list'>
                        <div> Food Pickup </div>
                        <div> Driving </div>
                        <div> Serving </div>
                        <div> Donate </div>
                      </div>
                    </div>

                    <p className='member'> Already a member? </p>
                    <div className='buttons'>
                      <Link className='login' to='/Login'>Login </Link>
                      <Link className='login' to='/SignUp'> Sign Up </Link>
                    </div>
                  </div>
                )} />
                <Route exact path="/Login" component={Login} />
                <Route exact path='/SignUp' component={SignUp} />
                <PrivateRoute path='/Driver' component={Driver} />
                <PrivateRoute path='/Business' component={Business} />
              </div>
            </DriverContext.Provider>
          </BusinessContext.Provider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
