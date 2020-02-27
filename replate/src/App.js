import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Driver from './components/Driver';
import PrivateRoute from './components/PrivateRoute';
import SignUpDriver from './components/SignUpDriver';
import SignUpBusiness from './components/SignUpBusiness';
import './App.css';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
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
        <Route path='/SignUpDriver' component={SignUpDriver} />
        <Route path='/SignUpBusiness' component={SignUpBusiness} />
        <PrivateRoute path='/Driver' component={Driver} />
      </div>
    </Router>
  );
}

export default App;
