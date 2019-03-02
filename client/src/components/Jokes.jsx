import React from 'react';
import axios from 'axios';
import Interceptor from './Interceptor';

class Jokes extends React.Component {
  state = {
    jokes: [],
  };
  componentDidMount() {
    axios.get('/jokes').then(res => {
      this.setState({ jokes: res.data });
    });
  }
  render() {
    return (
      <>
        <h2>List of Jokes</h2>
        <ul>
          {this.state.jokes.map(u => (
            <li key={u.id}>{u.joke}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Interceptor(Jokes);