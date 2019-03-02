import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Login from './components/Login'
import Jokes from './components/Jokes'
import Signup from './components/Signup';

class App extends Component {
  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/signin');
  };
  render() {
    return (
      <div className="App">
          <nav className="navbar">
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/jokes">Dad Jokes</NavLink>
            <button onClick={this.logout}>Logout</button>
          </nav>
        <header className="App-header">
        <Route path="/jokes" render={(props) => <Jokes {...props}/>}/>
        <Route path="/signin" render={(props) => <Login {...props}/>}/>
        <Route path="/signup" render = {(props) => <Signup {...props}/>}/>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
