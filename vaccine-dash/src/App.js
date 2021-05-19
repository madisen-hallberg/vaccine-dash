import React, { Component } from 'react';
import './App.css';

import Posts from './components/Posts';

class App extends Component {
  render(){
    return(
      <div className="App">
        <h1>COVID-19 Vaccination Tracker</h1>
        <Posts />
      </div>
    );
  }
}

export default App;
