import React, { Component } from 'react';
import './App.css';
import List from '../List/List';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Your To-Do List</h1>
        {/* passing List component */}
        <List />
      </div>
    );
  }
}

export default App;
