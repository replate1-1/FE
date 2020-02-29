import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// IMPORT ASSETS
import './css/App.css';
import mainPhotoLeft from './imgs/MainPhotoLeft.png';
import mainPhotoRight from './imgs/MainPhotoRight.png';

// IMPORT UTILITIES
import PrivateRoute from './utilities/PrivateRoute';

// IMPORT CONTEXTS
import { SessionContext } from "./contexts/SessionContext";
import { BusinessContext } from "./contexts/BusinessContext";
import { DriverContext } from "./contexts/DriverContext";

// IMPORT APP COMPONENTS
import Login from './components/Login/Login';
import Driver from './components/Driver/Driver';
import SignUp from './components/SignUp/SignUp';
import SignUpDriver from './components/SignUp/SignUpDriver';
import SignUpBusiness from './components/SignUp/SignUpBusiness';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const [logged, setLogged]         = useState( localStorage.getItem("token") );
  const [business, setBusiness]     = useState([]);
  const [driver, setDriver]         = useState([]);

  return (
    <div className='App'>
      <Header />
      <Router>
        <SessionContext.Provider value={{ logged, setLogged }}>
          <BusinessContext.Provider value={{ business, setBusiness }}>
            <DriverContext.Provider value={{ driver, setDriver }}>
              <div className="App">
                <Route exact path='/' render={props=> (
                  <div className='main-body'>
                    <div> 
                      <img src={mainPhotoLeft} />
                      <img src={mainPhotoRight} />
                    </div>
                    <p> Many businesses have leftover food at the end of the day. </p>
                    <p> We let them effortlessly have those extras picked up by a Replate volunteer and donate to one of our worthy partner organizations. </p>
                    <div>
                      <h1>Choose a time</h1>
                      <p> and a volunteer will show up and take those extras to a place of need. </p>
                    </div>

                    <h2>Get involved in...</h2>
                    <div> 
                      <img />
                      <div>
                        <div> Food Pickup </div>
                        <div> Driving </div>
                        <div> Serving </div>
                        <div> Donate </div>
                      </div>
                    </div>
                    
                    <Link to='/SignUp'> Already a member? </Link>
                    <Link to='/Login'> Login </Link>
                    <Link to={'/'}> Status </Link>
                  </div>
                )} />
                <Route exact path="/Login" component={Login} />
                <Route exact path='/SignUp' component={SignUp} />
                <Route path='/SignUp/Driver' component={SignUpDriver} />
                <Route path='/SignUp/Business' component={SignUpBusiness} />
                <PrivateRoute path='/Driver' component={Driver} />
              </div>
            </DriverContext.Provider>
          </BusinessContext.Provider>
        </SessionContext.Provider>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
