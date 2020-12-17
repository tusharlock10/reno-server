const { validationResult } = require('express-validator'),
  db = require('../db'),
  {
    createUser,
    getUser,
    updateUserInstallLocations,
    updateUserCurrentLocations
  } = require('../queries/user'),
  { successRegisterMail } = require('../nodemailer'),
  jwt = require('jsonwebtoken');

module.exports = {
  //facebookID -> (google,fb,guest id)
  async userValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstname,
      lastname,
      email,
      facebookID,
      profileImage
    } = req.body;

    let user = await db.query({
      query: getUser,
      variables: { facebookID }
    });

    if (user.data.users.length > 0) {
      id = user.data.users[0].id;
    }

    if (user.data.users.length <= 0) {
      user = await db.mutate({
        mutation: createUser,
        variables: {
          facebookID,
          firstname,
          lastname,
          email,
          profileImage
        }
      });
      id = user.data.createUser.id;
      await successRegisterMail(email, firstname);
    }

    //now return jwt to client

    const payload = {
      user: {
        facebookID,
        id
      }
    };

    //todo->change expire time

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        res.json({ token });
      }
    );
  },

  async getUserProfile(req, res, next) {
    const user = await db.query({
      query: getUser,
      variables: { facebookID: req.user.facebookID }
    });

    res.json(user.data.users[0]);
  },

  async updateUserInstallLocation(req, res, next) {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
    const user = await db.mutate({
      mutation: updateUserInstallLocations,
      variables: {
        id: req.user.id,
        installLocation: req.body.installLocation
      }
    });

    res.json(user.data.updateUser);
  },
  async updateUserCurrentLocation(req, res, next) {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     
    const user = await db.mutate({
      mutation: updateUserCurrentLocations,
      variables: {
        id: req.user.id,
        currentLocation: req.body.currentLocation
      }
    });

    res.json(user.data.updateUser);
    
  }
};
