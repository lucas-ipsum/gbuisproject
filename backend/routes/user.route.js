const express = require('express');
const app = express();
const userRoute = express.Router();
const jwt = require('jsonwebtoken');

// User Model
let User = require('../model/User');

// Add User (currently not used)
userRoute.route('/add-user').post((req, res, next) => {
  //consoloe.log(req, res)
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('User successfully created!')
    }
  })
})

// Find by username
userRoute.route('/get-user/:username').get((req, res) => {
  User.findOne({ username: req.params.username }, function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(data)
    }
  })
})
// Delete User by username
userRoute.route('/delete-user/:username').delete((req, res, next) => {
  User.findOneAndDelete({ username: req.params.username }, function (error, data) {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log('User successfully deleted!');
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Update one User
userRoute.route('/update-user/:username').put((req, res, next) => {
  User.findOneAndUpdate({username: req.params.username}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})

// Get all user
userRoute.route('/get-user').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Register User
userRoute.route('/register').post((req, res, next) => {
  var user = new User({
    herstellername: req.body.herstellername,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    rolle: req.body.rolle,
  })

  let promise = user.save();
  promise.then((doc) => {
    return res.status(201).json(doc);
  })
  promise.catch((err) => {
    return res.status(501).json({ message: 'Error registering User' })
  })
})

//Login Check for User
userRoute.route('/login-user').post((req, res, next) => {
  let promise = User.findOne({ username: req.body.username }).exec()
  promise.then((doc) => {
    if (doc) {
      if (doc.password === req.body.password) {
        let token = jwt.sign({ username: doc.username }, 'secret', { expiresIn: '3h' });
        return res.status(200).json(token);
      } else {
        return res.status(501).json({ message: 'Das Passwort ist nicht korrekt!' })
      }
    } else {
      return res.status(501).json({ message: 'Username existiert nicht!' })
    }
  });
  promise.catch((err) => {
    return res.status(501).json({ message: 'Es gibt Probleme mit dem Login, versuche es später nochmal' })
  })
});

// Update User by username
userRoute.route('/update-user/:username').put((req, res, next) => {
  User.findOneAndUpdate({ username: req.params.username }, req.body, null, function (error, data) {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
      console.log('User successfully updated!');
    }
  })
});

//verify Token
userRoute.get('/username', verifyToken, function (req, res, next) {
  return res.status(200).json(decodedToken.username)
})

let decodedToken = ''
function verifyToken(req, res, next) {
  let token = req.query.token;
  jwt.verify(token, 'secret', (err, tokendata) => {
    if (err) {
      return res.status(400).json({ message: 'Unauthorized Request' })
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = userRoute;
