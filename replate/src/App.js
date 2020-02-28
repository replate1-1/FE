import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// IMPORT ASSETS
import './css/App.css';

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

function App() {

  const [logged, setLogged]         = useState( localStorage.getItem("token") );
  const [business, setBusiness]     = useState([]);
  const [driver, setDriver]         = useState([]);

  return (
    <Router>
      <SessionContext value={{ logged, setLogged }}>
        <BusinessContext value={{ business, setBusiness }}>
          <DriverContext value={{ driver, setDriver }}>
            <div className="App">
              <Route exact path='/' render={props=> (
                <>
                  <Link to='/SignUp'> Sign Up </Link>
                  <br />
                  <Link to='/Login'> Login </Link>
                </>
              )} />
              <Route path="/Login" component={Login} />
              <Route path='/SignUp' component={SignUp} />
              <Route path='/SignUp/Driver' component={SignUpDriver} />
              <Route path='/SignUp/Business' component={SignUpBusiness} />
              <PrivateRoute path='/Driver' component={Driver} />
            </div>
          </DriverContext>
        </BusinessContext>
      </SessionContext>
    </Router>
  );
}

export default App;
