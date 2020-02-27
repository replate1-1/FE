import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Driver from './components/Driver';
import Business from './components/Business';

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
