import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        username: "",
        password: ""
    };

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        <h3>Register here!</h3>

            <div className="form-username">
            <input
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                placeholder='Name'
                type="text"
            />
            </div>
            <br></br>

            <div>
            <input
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder='Password'
                type="text"
            />
            </div>
            <br></br>

            <div>
            <button type='submit'>Register</button>
            </div>

        </form>
        );
    }

    handleInputChange = event => {
        event.preventDefault();
        //const target = event.target;
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const credientials = this.state;
        const endpoint = 'http://localhost:3300/api/register';
        axios.post(endpoint, credientials)
        .then(res => {
            console.log('response data from register', res.data );
            localStorage.setItem('jwt', res.data.token );
            this.props.history.push('/login');
        })
        .catch(err => {
            console.log('err from login', err);
        });
    }
}

export default Register;