import React from 'react';
import axios from 'axios';
import '../App.css';

class Jokes extends React.Component {
    state = {
        jokes: [],
    }

    render(){
        console.log(this.state.jokes)
        return(
            <div className="jokes">
                <h2>LIST OF JOKES!</h2>
                <img src="https://i.pinimg.com/originals/5f/bc/88/5fbc887ec3f8d511f6f29913511b147e.jpg" alt="pic"></img>
                <div>
                {this.state.jokes.map(u => (
                  <p key={u.id}>
                  <p>{u.joke}</p>
                  </p>
                ))}
                </div>
            </div>
        )
    }

    componentDidMount(){
        const token = localStorage.getItem('jwt');
        console.log(token)
        const endpoint = 'http://localhost:3300/api/jokes';
        const options = {
            headers: {
                Authorization: token
            }
        };

        axios.get(endpoint, options)
        .then(res => {
            console.log('data from /api/jokes', res.data );
            this.setState({ jokes: res.data })
        })
        .catch(err => {
            console.log('error from /api/jokes', err);
        })
    }
}

export default Jokes;
