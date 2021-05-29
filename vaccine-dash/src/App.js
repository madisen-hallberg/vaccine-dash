import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { HashRouter } from 'react-router-dom';


export default function App() {
  return(
    <HashRouter>
      <div className="App">
        <Header />
        <Main/>
      </div>
    </HashRouter>
  );
}