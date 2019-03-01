const axios = require('axios');
const bcrypt = require("bcryptjs");
const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");



const jwt = require("jsonwebtoken");
const db = knex(knexConfig.development);


const server = express();
server.use(express.json());


const secret = process.env.JWT_SECRET ||
'add a .env file to root of project with the JWT_SECRET variable';
//end of added lines

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
     username: user.username,
     jwtid: user.id
  }


  const options = {
     expiresIn: '1hr',
  }


  return jwt.sign(payload, secret, options)
}


function register(req, res) {
  // implement user registration
  const user = req.body;

  if(user.username && user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
    db("users").insert(user)

      .then(ids => {
        const id = ids[0];
        db("users").where("id", id).then(user => {

          if(user) {
            const token = generateToken(user[0])
            res.status(201).json({id: ids[0], token})

          } else {
            res.status(400).json({err: "Cannot find this user in the database. Please try again."})
          }
        })

      }).catch(err => res.status(500).send("An error occured registering this user. Please provide a username and password and try again."));
  
    } else{
    res.status(400).send("Provide a username and password!")
  }
}



function login(req, res) {
  // implement user login
  const login = req.body;

  if(login.username && login.password) {
    db("users").where("username", login.username)

      .then(users => {
        if(users.length && bcrypt.compareSync(login.password, users[0].password)){
          const token = generateToken(users[0])
          res.json({id: users[0].id, token})

        } else {
          res.status(400).send("Cannot find this user in the database. Please try again.")
        }

      }).catch(err =>  res.status(500).json({err: err}))

  } else {
    res.status(400).json({err: "Provide a username and password!"})
  }
}



function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
