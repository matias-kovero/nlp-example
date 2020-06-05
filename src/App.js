import React from 'react';
import logo from './logo.png';
import './App.css';
import config from './config.json';

import Navbar from 'react-bootstrap/Navbar';
import NlpApp from './components/NlpApp';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: config.appColors.background}}>
        <Navbar variant={config.appColors.navbarDark ? 'dark' : 'light'} style={{backgroundColor: config.appColors.navbarColor}} fixed='top'>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            {process.env.REACT_APP_NAME}
          </Navbar.Brand>
        </Navbar>
        <NlpApp 
          textColor={config.appColors.textColor} 
          formColor={config.appColors.formColors} 
          sentences={config.sentences} 
          colors={config.legendColors} 
        />
      </header>
    </div>
  );
}

export default App;
