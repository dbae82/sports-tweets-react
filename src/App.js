import React from 'react';
import Nav from './components/Nav';
import Routes from './config/routes';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
