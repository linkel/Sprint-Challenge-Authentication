const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const { authenticate, generateToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let user = req.body;
  if (user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 3);
    user.password = hash;
    db('users').insert(user)
    .then(result => {
      const [id] = result;
      db('users').where({id})
      .first()
      .then(userAdded => {
        res.status(200).json(userAdded)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({message: "User added but error accessing db."})
      })
    })
    .catch(err => {
      res.status(500).json({message: "Error accessing DB."})
      console.log(err);
    })
  }
}

function login(req, res) {
  let {username, password} = req.body;
  db('users').where('username', username).first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Successful log-in completed for ${user.username}`,
        token,
      });
    } else {
      res.status(401).json({message: "Invalid credentials."})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
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
