import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import './reset.css'
import './App.css';

import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {routes}
      </div>
    );
  }
}

export default App;
