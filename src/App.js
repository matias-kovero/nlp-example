import React from 'react';
import logo from './logo.png';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import NlpApp from './components/NlpApp';

const colors = {
  background: '#282c34',
  textColor: '#FFFFFF',
  navbarColor: '#343a40',
  navbarDark: true,
  formColors: '#343a40'
};

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: colors.background}}>
        <Navbar variant={colors.navbarDark ? 'dark' : 'light'} style={{backgroundColor: colors.navbarColor}} fixed='top'>
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
        <NlpApp textColor={colors.textColor} formColor={colors.formColors} />
      </header>
    </div>
  );
}

export default App;
