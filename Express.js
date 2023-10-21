const express = require('express');
const router = express.Router();
const User = require('./user');  // Import your MongoDB model

router.post('/createUser', (req, res) => {
  const { firstName, lastName } = req.body;
  const newUser = new User({ firstName, lastName });

  newUser.save((err) => {
    if (err) {
      res.status(500).send('Error saving user');
    } else {
      res.status(200).send('User saved successfully');
    }
  });
});

module.exports = router;
