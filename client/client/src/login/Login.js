import React from 'react';
import axios from 'axios';
import '../App.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div className="login">
        <h2>Welcome!</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>
          <br></br>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name] : target.value })
}

handleSubmit = event => {
    event.preventDefault();
    const credentials = this.state;
    const endpoint = 'http://localhost:3300/api/login';
    axios.post(endpoint, credentials)
    .then(res => {
        console.log('response data from login', res.data);
        localStorage.setItem('jwt', res.data.token);  
        this.props.history.push('/jokes'); 
    })
    .catch(err => {
        console.log('err from login', err);
    });
}

}

export default Login;
