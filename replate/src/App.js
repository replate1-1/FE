import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// IMPORT ASSETS
import './css/App.css';
import mainPhotoLeft from './imgs/Soup1.jpg';
import mainPhotoRight from './imgs/Soup2.jpg';
import foodKitchen from './imgs/Soup3.jpg';

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

function App() {

  const [business, setBusiness]     = useState(false);
  const [driver, setDriver]         = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () =>{
      let vh = window.innerHeight * .01;
      document.documentElement.style.setProperty('--vh',
       `${vh}px`);
    })
  }, [])
  
  return (
      <Router>
      <div className='wrapper'>
      <Header />
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
                <PrivateRoute path='/Driver/:userID' component={Driver} />
                <PrivateRoute path='/Business/:userID' component={Business} />
              </div>
            </DriverContext.Provider>
          </BusinessContext.Provider>
          </div>
          <div className="push"></div>
        <Footer />
      </Router>
  );
}

export default App;
