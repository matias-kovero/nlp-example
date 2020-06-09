import React from 'react';
import logo from './logo.png';
import './App.css';
import config from './config.json';

import Navbar from 'react-bootstrap/Navbar';
import NlpApp from './components/NlpApp';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container fluid className='App-body' style={{backgroundColor: config.appColors.background}}>
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
          apiField={process.env.REACT_APP_COLLECTION_FIELD}
        />
    </Container>
  );
}

export default App;
//<div className="App-body" style={{backgroundColor: config.appColors.background}}>